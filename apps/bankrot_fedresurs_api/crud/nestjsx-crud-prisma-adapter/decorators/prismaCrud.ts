import { CrudOptions } from '../../nestjsx-crud-fork/crud/src';
import { PrismaCrudRoutesFactory } from '../prismaCrudRoutesFactory';

export const PrismaCrud = (options: CrudOptions) => (target: Object) => {
  PrismaCrudRoutesFactory.create(target, options);
};
