
import {user_role} from '@prisma/client'
import {UsersRolesPivot} from './usersRolesPivot.entity'


export class UsersRoles {
  id: number ;
deleted_at: Date  | null;
code: user_role ;
UsersRolesPivot?: UsersRolesPivot[] ;
}
