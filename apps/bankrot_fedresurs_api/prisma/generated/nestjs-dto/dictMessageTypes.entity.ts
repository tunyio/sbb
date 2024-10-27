
import {MessagesList} from './messagesList.entity'


export class DictMessageTypes {
  id: number ;
deleted_at: Date  | null;
code: string ;
title: string ;
parent_id: number  | null;
DictMessageTypes?: DictMessageTypes  | null;
other_DictMessageTypes?: DictMessageTypes[] ;
MessagesList?: MessagesList[] ;
}
