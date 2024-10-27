
import {user_role} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class CreateUsersRolesDto {
  deleted_at?: Date;
@ApiProperty({ enum: user_role})
code: user_role;
}
