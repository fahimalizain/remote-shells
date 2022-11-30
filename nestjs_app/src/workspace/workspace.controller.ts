import {
    Request,
    Param,
    Body,
    Controller,
    Get,
    Post,
    Put,
    Delete,
} from '@nestjs/common';
import {
    CreateWorkspaceDTO,
    WorkspaceInviteAcceptDTO,
    WorkspaceInviteDTO,
} from './dto';
import { WorkspaceService } from './workspace.service';
import { ObjectIdValidationPipe } from '../utils/object-id-validation.pipe';

@Controller('workspace')
export class WorkspaceController {
    constructor(private workspaceService: WorkspaceService) {}

    @Get('/')
    getWorkspaces(@Request() req) {
        return this.workspaceService.getUserWorkspaces(req.user.userId);
    }

    @Post('/')
    createWorkspace(@Request() req, @Body() data: CreateWorkspaceDTO) {
        data.owner_user = req.user.userId;
        return this.workspaceService.createWorkspace(data);
    }

    @Post('/:workspace/invitations')
    inviteToWorkspace(
        @Param('workspace', new ObjectIdValidationPipe()) workspace_id: string,
        @Body() data: WorkspaceInviteDTO,
    ) {
        return this.workspaceService.inviteToWorkspace(
            workspace_id,
            data.email,
        );
    }

    @Put('/:workspace/invitations/:invitation')
    acceptInvitation(
        @Param('workspace', new ObjectIdValidationPipe()) workspace: string,
        @Param('invitation', new ObjectIdValidationPipe())
        invitation_id: string,
        @Body() data: WorkspaceInviteAcceptDTO,
    ) {
        return this.workspaceService.acceptInvite(
            workspace,
            invitation_id,
            data.token,
        );
    }

    @Delete('/:workspace/invitations/:invitation')
    cancelWorkspaceInvite(
        @Param('workspace', new ObjectIdValidationPipe()) workspace_id: string,
        @Param('invitation', new ObjectIdValidationPipe())
        invitation_id: string,
    ) {
        return this.workspaceService.cancelInvite(workspace_id, invitation_id);
    }
}
