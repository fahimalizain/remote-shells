import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DevicesModule } from './devices/devices.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, DevicesModule, WorkspacesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
