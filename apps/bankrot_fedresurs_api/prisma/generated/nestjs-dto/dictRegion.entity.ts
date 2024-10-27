
import {DeptorsIndivList} from './deptorsIndivList.entity'
import {DeptorsLegalList} from './deptorsLegalList.entity'


export class DictRegion {
  id: number ;
deleted_at: Date  | null;
okato_oktmo_code: string  | null;
title: string ;
DeptorsIndivList?: DeptorsIndivList[] ;
DeptorsLegalList?: DeptorsLegalList[] ;
}
