import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from './device.schema';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Device.name, schema: DeviceSchema },
        ]),
    ],
    providers: [DeviceService],
    controllers: [DeviceController],
})
export class DevicesModule {}
