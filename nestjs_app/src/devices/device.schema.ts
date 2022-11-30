import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Types as MongooseTypes } from 'mongoose';
import { Workspace } from '../workspace/workspace.schema';

export type DeviceDocument = HydratedDocument<Device>;

@Schema()
export class Device {
    @Prop({ required: true })
    title: string;

    @Prop({
        type: MongooseTypes.ObjectId,
        ref: Workspace.name,
        required: true,
    })
    workspace: Workspace;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
