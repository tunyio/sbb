
import {UsersList} from './usersList.entity'
import {UsersRoles} from './usersRoles.entity'


export class UsersRolesPivot {
  id: number ;
user_id: number ;
user_role_id: number ;
created_at: Date  | null;
UsersList?: UsersList ;
UsersRoles?: UsersRoles ;
}
