import { R } from '../crud';
import { AuthOptions } from '../interfaces';

export const CrudAuth =
  (options: AuthOptions) =>
  (target: unknown): void => {
    R.setCrudAuthOptions(options, target);
  };
