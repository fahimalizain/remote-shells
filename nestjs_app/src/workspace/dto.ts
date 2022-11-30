import { IsString, IsArray, IsEmail } from 'class-validator';

export class CreateWorkspaceDTO {
    @IsString()
    workspace_title: string;

    /**
     * Currently logged in User
     */
    owner_user: string;

    @IsArray()
    invite_emails: string[];
}

export class WorkspaceInviteDTO {
    @IsEmail()
    email: string;
}

export class WorkspaceInviteAcceptDTO {
    @IsString()
    token: string;
}