import { AppRequest } from '../common/typing';

export interface FileController {
  uploadByPgIdAndFieldName(req: AppRequest, pgId: number, fieldName: string);
}

export interface FileControllerFactoryOpts {
  entity: Function;
  permissions: (req: AppRequest, pgId: number, fieldName: string) => Promise<void>;
  routes: {
    uploadByPgIdAndFieldName: {
      decorators: MethodDecorator[];
    };
  };
}
