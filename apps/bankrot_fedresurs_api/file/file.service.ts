import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { getPrismaTableName } from '../common/utils';
import { MultipartFile, MultipartValue } from '@fastify/multipart';
import { MinioService } from '../s3';
import { UploadedObjectInfo } from 'minio/src/internal/type';

@Injectable()
export class FileService {
  constructor(
    public readonly prisma: PrismaService,
    private readonly minioService: MinioService
  ) {}

  private getPrismaClient = (entity: Function): PrismaClient =>
    this.prisma[getPrismaTableName(entity.name)];

  public getS3key = (entity: Function, pgId: number, fieldName: string) =>
    `${entity.name}_${pgId}_${fieldName}`;

  async uploadByPgIdAndFieldName(
    entity: Function,
    pgId: number,
    fieldName: string,
    mpAsyncIterator: AsyncIterableIterator<MultipartValue | MultipartFile>
  ) {
    for await (const part of mpAsyncIterator) {
      if (part.type !== 'file' || part.fieldname !== fieldName) continue;

      const uploadRes: UploadedObjectInfo = await this.minioService.putObject(
        this.getS3key(entity, pgId, fieldName),
        part.file
      );

      const prismaClient = this.getPrismaClient(entity);
      // @ts-ignore
      const res = await prismaClient.update({
        where: {
          id: pgId
        },
        data: {
          [fieldName]: {
            uploadedObjectInfo: uploadRes
          }
        }
      });
      if (!res) throw new Error();

      // Required for design with one pg_record linked to one file
      break;
    }
  }
}
