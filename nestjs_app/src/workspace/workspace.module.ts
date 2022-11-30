import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspaceController } from './workspace.controller';
import { Workspace, WorkspaceSchema } from './workspace.schema';
import { WorkspaceService } from './workspace.service';
import { UsersModule } from '../users/users.module';

@Module({
    controllers: [WorkspaceController],
    imports: [
        UsersModule,
        MongooseModule.forFeature([
            { name: Workspace.name, schema: WorkspaceSchema },
        ]),
    ],
    providers: [WorkspaceService],
})
export class WorkspaceModule {}
