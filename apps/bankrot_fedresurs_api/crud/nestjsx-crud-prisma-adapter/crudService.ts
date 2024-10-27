import { CrudService as NestJSXCrudService } from '../nestjsx-crud-fork/crud/src';

export default abstract class CrudService<T> extends NestJSXCrudService<T> {}
