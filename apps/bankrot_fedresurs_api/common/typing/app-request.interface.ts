import { FastifyRequest } from 'fastify';
import { PassportUser } from './based-on-prisma-models';

export interface AppRequest extends FastifyRequest {
  user: PassportUser;
}
