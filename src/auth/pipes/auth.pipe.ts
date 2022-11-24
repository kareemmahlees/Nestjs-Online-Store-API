import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as  bcrypt from "bcrypt"

/**
 * this is a pipe to hash the password before 
 * handing the arguments to the request handler
 */
@Injectable()
export class AuthPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        value.password = bcrypt.hashSync(value.password, 10)
        return value
    }
}
