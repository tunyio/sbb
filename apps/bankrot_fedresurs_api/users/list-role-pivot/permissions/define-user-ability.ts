import {
  AbilityBuilder,
  PureAbility,
  AbilityClass,
  FieldMatcher
} from '@casl/ability';
import { crudEntityName } from './crud-entity-name.constant';
import { ForbiddenException } from '@nestjs/common';
import { ProceedCrudAuth } from '../../../common/typing';

type UsersListRolePivotAbility = PureAbility<[string, typeof crudEntityName]>;
const usersListRolePivotAbility =
  PureAbility as AbilityClass<UsersListRolePivotAbility>;
const fieldMatcher: FieldMatcher = (fields) => (field) => fields.includes(field);

export function defineCrudAbilityForUsersListRolePivot({
  user,
  method
}: ProceedCrudAuth) {
  const builder = new AbilityBuilder<UsersListRolePivotAbility>(
    usersListRolePivotAbility
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
          default:
            throw new ForbiddenException();
        }
        break;
    }
  }

  return builder.build({ fieldMatcher });
}
