import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { ObjectIdValidationPipe } from '../utils/object-id-validation.pipe';
import { DeviceService } from './device.service';
import { DeviceInfoDTO } from './dto';

@Controller()
export class DeviceController {
    constructor(private deviceService: DeviceService) {}

    @Get('/workspace/:workspace/devices')
    getDevices(
        @Param('workspace', new ObjectIdValidationPipe()) workspace_id: string,
    ) {
        return this.deviceService.getDevices(workspace_id);
    }

    @Post('/workspace/:workspace/devices')
    createDevice(
        @Param('workspace', new ObjectIdValidationPipe()) workspace_id: string,
        @Body() data: DeviceInfoDTO,
    ) {
        return this.deviceService.createDevice(workspace_id, data);
    }

    @Put('/workspace/:workspace/devices/:device')
    updateDevice(
        @Param('workspace', new ObjectIdValidationPipe()) workspace_id: string,
        @Param('device', new ObjectIdValidationPipe()) device_id: string,
        @Body() data: DeviceInfoDTO,
    ) {
        return this.deviceService.updateDevice(workspace_id, device_id, data);
    }

    @Delete('/workspace/:workspace/devices/:device')
    deleteDevice(
        @Param('workspace', new ObjectIdValidationPipe()) workspace_id: string,
        @Param('device', new ObjectIdValidationPipe()) device_id: string,
    ) {
        return this.deviceService.deleteDevice(workspace_id, device_id);
    }
}
