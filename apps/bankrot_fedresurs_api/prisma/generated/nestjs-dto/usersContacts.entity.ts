
import {UsersList} from './usersList.entity'


export class UsersContacts {
  id: number ;
deleted_at: Date  | null;
user_id: number ;
email: string  | null;
email_passw_reset_token: string  | null;
UsersList?: UsersList ;
}
