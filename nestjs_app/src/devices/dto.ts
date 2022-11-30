import { IsString } from 'class-validator';

export class DeviceInfoDTO {
    @IsString()
    title: string;
}
