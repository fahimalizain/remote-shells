import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { Types } from "mongoose";

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!Types.ObjectId.isValid(value)) {
            throw new BadRequestException(`${value} is not a valid ObjectID`)
        }
        return value;
    }
}
