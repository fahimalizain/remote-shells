import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from './device.schema';
import { DeviceInfoDTO } from './dto';

@Injectable()
export class DeviceService {
    constructor(
        @InjectModel(Device.name)
        private deviceModel: Model<DeviceDocument>
    ) {}

    async getDevices(workspace_id: string) {
        // TODO: Verify user access to workspace
        return this.deviceModel.find({ workspace: workspace_id });
    }

    async createDevice(workspace_id: string, data: DeviceInfoDTO) {
        const mappedData = {
            ...data,
            workspace: workspace_id,
        };

        const device = new this.deviceModel(mappedData);
        await device.save();

        return device;
    }

    async updateDevice(
        workspace_id: string,
        device_id: string,
        data: DeviceInfoDTO,
    ) {
        const device = await this.getDeviceInWorkspace(workspace_id, device_id);
        device.title = data.title;
        await device.save();

        return device;
    }

    async deleteDevice(workspace_id: string, device_id: string) {
        const device = await this.getDeviceInWorkspace(workspace_id, device_id);
        device.delete();

        return device;
    }

    async getDeviceInWorkspace(
        workspace_id: string,
        device_id: string,
    ): Promise<DeviceDocument | null> {
        const device = await this.deviceModel.findById(device_id);

        // TODO: Verify user access to Workspace

        // @ts-ignore
        if (!device || device.workspace != workspace_id) {
            throw new NotFoundException({
                error_code: 'NOT_FOUND',
                message: `Device ${device_id} not found in Workspace ${workspace_id}`,
            });
        }

        return device;
    }
}
