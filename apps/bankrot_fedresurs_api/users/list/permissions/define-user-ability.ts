import {
  AbilityBuilder,
  PureAbility,
  AbilityClass,
  FieldMatcher
} from '@casl/ability';
import { crudEntityName } from './crud-entity-name.constant';
import { ForbiddenException } from '@nestjs/common';
import { ProceedCrudAuth } from '../../../common/typing';

type UsersListAbility = PureAbility<[string, typeof crudEntityName]>;
const usersListAbility = PureAbility as AbilityClass<UsersListAbility>;
const fieldMatcher: FieldMatcher = (fields) => (field) => fields.includes(field);

export function defineCrudAbilityForUsersList({ user, method }: ProceedCrudAuth) {
  const builder = new AbilityBuilder<UsersListAbility>(usersListAbility);
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
