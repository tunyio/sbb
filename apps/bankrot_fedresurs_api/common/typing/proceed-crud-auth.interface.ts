import { PassportUser } from './based-on-prisma-models';
import { HTTPMethods } from 'fastify';

export interface ProceedCrudAuth {
  user: PassportUser;
  method: HTTPMethods;
  requestDto?: Record<string, any>;
}
