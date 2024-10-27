
import {message_status} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class CreateMessagesListDto {
  updated_at?: Date;
deleted_at?: Date;
@ApiProperty({ enum: message_status})
status?: message_status;
publication_date: Date;
blocked?: boolean;
blocked_reason?: string;
}
