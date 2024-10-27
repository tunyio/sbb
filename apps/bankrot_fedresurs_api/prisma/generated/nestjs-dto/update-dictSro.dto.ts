
import {sro_document_type} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'




export class UpdateDictSroDto {
  deleted_at?: Date;
code?: string;
title?: string;
register_number?: string;
@ApiProperty({ enum: sro_document_type})
document_type?: sro_document_type;
}
