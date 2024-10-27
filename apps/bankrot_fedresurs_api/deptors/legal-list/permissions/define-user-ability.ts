import {
  AbilityBuilder,
  PureAbility,
  AbilityClass,
  FieldMatcher
} from '@casl/ability';
import { crudEntityName } from './crud-entity-name.constant';
import { ForbiddenException } from '@nestjs/common';
import { ProceedCrudAuth } from '../../../common/typing';

type DeptorsLegalListAbility = PureAbility<[string, typeof crudEntityName]>;
const deptorsLegalListAbility =
  PureAbility as AbilityClass<DeptorsLegalListAbility>;
const fieldMatcher: FieldMatcher = (fields) => (field) => fields.includes(field);

export function defineCrudAbilityForDeptorsLegalList({
  user,
  method
}: ProceedCrudAuth) {
  const builder = new AbilityBuilder<DeptorsLegalListAbility>(
    deptorsLegalListAbility
  );
  builder.cannot('manage', crudEntityName);

  if (user.isAdmin) {
    builder.can('manage', crudEntityName);
    return builder.build({ fieldMatcher });
  }

  for (const usersRolesPivot of user.data_not_admin.UsersRolesPivot) {
    const role = usersRolesPivot.UsersRoles;
    switch (role.code) {
      case 'arbitrazhnii_upravlyayushchii':
        switch (method) {
          case 'GET':
            builder.can('GET', crudEntityName);
            break;
          case 'POST':
            builder.can('POST', crudEntityName);
            break;
          case 'PATCH':
            builder.can('PATCH', crudEntityName);
            break;
          case 'PUT':
            builder.can('PUT', crudEntityName);
            break;
          case 'DELETE':
            builder.can('DELETE', crudEntityName);
            break;
          default:
            throw new ForbiddenException();
        }
        break;
    }
  }

  return builder.build({ fieldMatcher });
}
