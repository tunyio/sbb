import { mixin, Post, Type, Request, Param, ParseIntPipe } from '@nestjs/common';
import { AbstractFactory } from '../common/utils/abstract.factory';
import {
  FileController,
  FileControllerFactoryOpts
} from './file-controller.interface';
import { FileService } from './file.service';
import { AppRequest } from '../common/typing';

export class FileControllerFactory extends AbstractFactory<FileController> {
  readonly product: Type<FileController>;
  readonly options: FileControllerFactoryOpts;

  constructor(options: FileControllerFactoryOpts) {
    super();
    this.options = options;
    this.product = this.create();
    this.applyDecoratorsByMethods(this.options.routes);
  }

  protected create(): Type<FileController> {
    const { entity, permissions } = this.options;

    class NewController implements FileController {
      constructor(readonly fileService: FileService) {}

      @Post('upload/:pgId/:fieldName')
      async uploadByPgIdAndFieldName(
        @Request() req: AppRequest,
        @Param('pgId', new ParseIntPipe()) pgId: number,
        @Param('fieldName') fieldName: string
      ) {
        await permissions(req, pgId, fieldName);

        return this.fileService.uploadByPgIdAndFieldName(
          entity,
          pgId,
          fieldName,
          req.parts({ limits: { fileSize: 10 * 1024 * 1024 } })
        );
      }
    }

    return mixin(NewController);
  }
}
