





export class CreateUsersListDto {
  deleted_at?: Date;
blocked?: boolean;
blocked_reason?: string;
login: string;
passw_hash?: string;
}
