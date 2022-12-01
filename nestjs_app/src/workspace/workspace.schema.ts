import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Types as MongooseTypes } from 'mongoose';
import { User, UserDocument } from 'src/users/user.schema';

export type WorkspaceDocument = HydratedDocument<Workspace>;

@Schema()
export class Workspace {
    @Prop({ required: true })
    workspace_title: string;

    @Prop({
        type: MongooseTypes.ObjectId,
        ref: User.name,
        required: true,
    })
    owner_user: UserDocument;

    @Prop({
        type: [{ type: MongooseTypes.ObjectId, ref: User.name }],
    })
    members: UserDocument[];

    @Prop({
        type: [
            raw({
                email: { type: String },
                token: {
                    type: MongooseTypes.ObjectId,
                    required: true,
                    auto: true,
                },
            }),
        ],
    })
    invitations: Record<string, any>[];
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
