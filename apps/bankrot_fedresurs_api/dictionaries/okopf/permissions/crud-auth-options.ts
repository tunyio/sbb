import { HTTPMethods } from 'fastify';
import { ForbiddenException } from '@nestjs/common';
import { AuthOptions } from '../../../crud/nestjsx-crud-fork/crud/src';
import { AppRequest } from '../../../common/typing';
import { defineCrudAbilityForDictOkopf } from './define-user-ability';
import { ProceedCrudAuth } from '../../../common/typing';
import { SCondition } from '../../../crud/nestjsx-crud-fork/crud-request/src';
import { crudEntityName } from './crud-entity-name.constant';

const obviouslyReachableSearchCondition: SCondition = {};

export const crudAuthOptionsForDictOkopf: AuthOptions = {
  filter: (request: AppRequest) => {
    const user = request?.user;
    const method = request.method as HTTPMethods;
    const requestDto = request.body;

    // Proceed anonymous allowed crud filter
    const isAnonymous = !user;
    if (isAnonymous) {
      switch (method) {
        case 'GET':
          return obviouslyReachableSearchCondition;
      }

      throw new ForbiddenException();
    }

    getChecksInsideCaslResponsibility({ user, method });

    getChecksOutsideCaslResponsibility({ user, method, requestDto });

    return {
      $or: getFilters({ user, method })
    };
  }
};

function getChecksInsideCaslResponsibility(args: ProceedCrudAuth): void {
  const userAbility = defineCrudAbilityForDictOkopf(args);

  if (userAbility.cannot(args.method, crudEntityName)) {
    throw new ForbiddenException();
  }
}

function getChecksOutsideCaslResponsibility({
  user,
  method,
  requestDto
}: ProceedCrudAuth): void {}

function getFilters({ user, method }: ProceedCrudAuth): SCondition[] {
  const rolesSConditions: SCondition[] = [];
  if (!user.isAdmin) {
    for (const usersRolesPivot of user.data_not_admin.UsersRolesPivot) {
      const role = usersRolesPivot.UsersRoles;
      switch (role.code) {
        case 'arbitrazhnii_upravlyayushchii':
          switch (method) {
            case 'GET':
            case 'POST':
            case 'PATCH':
            case 'PUT':
            case 'DELETE':
              rolesSConditions.push(obviouslyReachableSearchCondition);
              break;
            default:
              throw new ForbiddenException();
          }
          break;
        default:
          throw new ForbiddenException();
      }
    }
  }

  const allSConditions: SCondition[] = [...rolesSConditions];
  if (!allSConditions.length) throw new ForbiddenException();
  else return allSConditions;
}
