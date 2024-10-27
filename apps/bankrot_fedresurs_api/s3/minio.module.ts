import { Module } from '@nestjs/common';
import { Client } from 'minio';

import { MinioService } from './minio.service';
import { MINIO_CLIENT } from './minio_client.token';

const minioClientFactory = {
  provide: MINIO_CLIENT,
  useFactory: function () {
    if (!this.minioConnection) {
      this.minioConnection = new Client({
        endPoint: 'minio',
        port: 9000,
        useSSL: false,
        accessKey: process.env?.MINIO_ROOT_USER,
        secretKey: process.env?.MINIO_ROOT_PASSWORD
      });
    }

    return this.minioConnection;
  }
};

@Module({
  providers: [MinioService, minioClientFactory],
  exports: [MinioService]
})
export class MinioModule {}
