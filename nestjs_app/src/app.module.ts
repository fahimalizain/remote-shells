import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DevicesModule } from './devices/devices.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    DevicesModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/remoteshells'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
