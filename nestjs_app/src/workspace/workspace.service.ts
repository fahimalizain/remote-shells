import { Model, Types } from 'mongoose';
import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateWorkspaceDTO } from './dto';
import { Workspace, WorkspaceDocument } from './workspace.schema';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class WorkspaceService {
    constructor(
        @InjectModel(Workspace.name)
        private workspaceModel: Model<WorkspaceDocument>,
        private authService: AuthService,
    ) {}

    async createWorkspace(data: CreateWorkspaceDTO) {
        const mappedData = {
            ...data,
            owner_user: data.owner_user,
            members: [data.owner_user],
            invitations: data.invite_emails.map((x) => ({ email: x })),
        };

        const workspace = new this.workspaceModel(mappedData);
        await workspace.save();

        return workspace;
    }

    async getUserWorkspaces(user_id: string): Promise<Workspace[]> {
        return await this.workspaceModel
            .find({ members: user_id })
            .populate('members');
    }

    async getWorkspaceById(workspace_id: string): Promise<WorkspaceDocument> {
        const workspace = await this.workspaceModel.findById(workspace_id);
        if (!workspace) {
            throw new NotFoundException({
                error_code: 'NOT_FOUND',
                message: `Workspace ${workspace_id} not found`,
            });
        }

        // Verify current User is a Member of the Workspace
        const user = this.authService.getActiveUser();
        console.log("getWP", user)
        if (!workspace.members.find(x => x._id == user.userId)) {
            throw new NotFoundException({
                error_code: 'NOT_FOUND',
                message: `Workspace ${workspace_id} not found`,
            });
        }

        return workspace;
    }

    async inviteToWorkspace(workspace_id: string, email: string) {
        const workspace = await this.getWorkspaceById(workspace_id);
        if (workspace.invitations.some((x) => x.email == email)) {
            throw new ConflictException({
                error_code: 'PENDING_INVITE',
                message: `Pending Workspace invite exists for ${email}`,
            });
        }

        workspace.invitations.push({
            email,
        });
        await workspace.save();

        return workspace;
    }

    async cancelInvite(workspace_id: string, invite_id: string) {
        const workspace = await this.getWorkspaceById(workspace_id);
        const inviteIdx = workspace.invitations.findIndex(
            (x) => x._id == invite_id,
        );
        if (inviteIdx == -1) {
            throw new NotFoundException({
                error_code: 'NOT_FOUND',
                message: 'Cannot find the specified Invite',
            });
        }

        workspace.invitations.splice(inviteIdx, 1);
        await workspace.save();

        return workspace;
    }

    async updateWorkspace(workspace_id: string) {}

    async acceptInvite(
        workspace_id: string,
        invitation_id: string,
        token: string,
    ) {
        const workspace = await this.getWorkspaceById(workspace_id);
        const inviteIdx = workspace.invitations.findIndex(
            (x) => x._id == invitation_id && x.token == token,
        );

        if (inviteIdx == -1) {
            throw new NotFoundException({
                error_code: 'NOT_FOUND',
                message: 'Cannot find the specified Invite',
            });
        }

        workspace.invitations.splice(inviteIdx, 1);
        // TODO: Verify invite.email == current logged in User.email
        // TODO: Append the currently logged-in user to members
        await workspace.save();

        return workspace;
    }

    async terminateWorkspace(workspace_id: string) {}
}
