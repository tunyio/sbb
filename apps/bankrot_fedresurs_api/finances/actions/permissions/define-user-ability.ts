import {
  AbilityBuilder,
  PureAbility,
  AbilityClass,
  FieldMatcher
} from '@casl/ability';
import { crudEntityName } from './crud-entity-name.constant';
import { ForbiddenException } from '@nestjs/common';
import { ProceedCrudAuth } from '../../../common/typing';

type FinancesActionsAbility = PureAbility<[string, typeof crudEntityName]>;
const financesActionsAbility =
  PureAbility as AbilityClass<FinancesActionsAbility>;
const fieldMatcher: FieldMatcher = (fields) => (field) => fields.includes(field);

export function defineCrudAbilityForFinancesActions({
  user,
  method
}: ProceedCrudAuth) {
  const builder = new AbilityBuilder<FinancesActionsAbility>(
    financesActionsAbility
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