
import {message_publisher} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateMessagesPublisherListDto {
  deleted_at?: Date;
@ApiProperty({ enum: message_publisher})
type?: message_publisher;
}
