import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { MinioModule } from '../s3';

@Module({
  imports: [MinioModule],
  providers: [FileService],
  exports: [FileService]
})
export class FileModule {}
