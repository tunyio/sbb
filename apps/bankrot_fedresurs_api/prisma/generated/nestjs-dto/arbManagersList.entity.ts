
import {ArbManagersActions} from './arbManagersActions.entity'
import {DictSro} from './dictSro.entity'
import {UsersList} from './usersList.entity'
import {ArbManagersReports} from './arbManagersReports.entity'
import {MessagesPublisherList} from './messagesPublisherList.entity'


export class ArbManagersList {
  id: number ;
deleted_at: Date  | null;
user_id: number ;
name_first: string  | null;
name_second: string  | null;
name_family: string  | null;
name_full: string  | null;
registry_number: string  | null;
sro_id: number  | null;
ArbManagersActions?: ArbManagersActions  | null;
DictSro?: DictSro  | null;
UsersList?: UsersList ;
ArbManagersReports?: ArbManagersReports  | null;
MessagesPublisherList?: MessagesPublisherList[] ;
}
