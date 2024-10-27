import { QueryFilter, SCondition } from '../../../crud-request/src';

export type QueryFilterFunction = (
  search?: SCondition,
  getMany?: boolean
) => SCondition | void;
export type QueryFilterOption = QueryFilter[] | SCondition | QueryFilterFunction;
