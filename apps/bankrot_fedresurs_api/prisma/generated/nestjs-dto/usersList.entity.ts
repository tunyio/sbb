
import {ArbManagersList} from './arbManagersList.entity'
import {UsersContacts} from './usersContacts.entity'
import {UsersRolesPivot} from './usersRolesPivot.entity'


export class UsersList {
  id: number ;
deleted_at: Date  | null;
blocked: boolean  | null;
blocked_reason: string  | null;
login: string ;
passw_hash: string  | null;
ArbManagersList?: ArbManagersList  | null;
UsersContacts?: UsersContacts[] ;
UsersRolesPivot?: UsersRolesPivot[] ;
}
