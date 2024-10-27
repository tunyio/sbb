import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchCommonService } from './search.common-service';
import {
  MAIN_INDEX_NAME,
  DEPTORS_INDIV_LIST_DEFAULT_PAGE_SIZE,
  DEPTORS_INDIV_LIST_DOC_TYPE
} from './search.constants';
import { SearchDeptorsIndivListDto } from './dto/deptors-indiv-list.dto';
import { DeptorsIndivListSearchDoc } from '../common/typing/based-on-prisma-models';

@Injectable()
export class SearchDeptorsIndivListService {
  constructor(
    private readonly esService: ElasticsearchService,
    private readonly searchCommonService: SearchCommonService
  ) {}

  public async indexDeptorsIndivListDoc(
    deptorsIndivListDoc: DeptorsIndivListSearchDoc
  ): Promise<any> {
    const exists = await this.getDeptorsIndivListDoc(deptorsIndivListDoc.id);

    if (!exists) return this.addDeptorsIndivListDoc(deptorsIndivListDoc);
    else return this.updateDeptorsIndivListDoc(deptorsIndivListDoc);
  }

  private async getDeptorsIndivListDoc(
    docPgId: number | string
  ): Promise<DeptorsIndivListSearchDoc | undefined> {
    return (
      await this.searchCommonService.getDocument(
        MAIN_INDEX_NAME,
        DEPTORS_INDIV_LIST_DOC_TYPE,
        String(docPgId)
      )
    )?._source as unknown as DeptorsIndivListSearchDoc;
  }

  private async addDeptorsIndivListDoc(
    deptorsIndivListDoc: DeptorsIndivListSearchDoc
  ): Promise<any> {
    return this.searchCommonService.indexDocument(MAIN_INDEX_NAME, {
      _search_doc_type: DEPTORS_INDIV_LIST_DOC_TYPE,
      ...deptorsIndivListDoc
    });
  }

  private async updateDeptorsIndivListDoc(
    deptorsIndivListDoc: DeptorsIndivListSearchDoc
  ): Promise<any> {
    return this.searchCommonService.updateDocument(MAIN_INDEX_NAME, {
      _search_doc_type: DEPTORS_INDIV_LIST_DOC_TYPE,
      ...deptorsIndivListDoc
    });
  }

  public async removeDeptorsIndivListDoc(docPgId: number | string) {
    return this.searchCommonService.removeDocument(
      MAIN_INDEX_NAME,
      DEPTORS_INDIV_LIST_DOC_TYPE,
      String(docPgId)
    );
  }

  public async searchDeptorsIndivListDocs(
    searchDeptorsIndivListDto: SearchDeptorsIndivListDto
  ): Promise<any> {
    const deptorsIndivListMust: any[] = [];
    const deptorsIndivListFilter: any[] = [];

    if (searchDeptorsIndivListDto?.fields?.region_id) {
      deptorsIndivListMust.push({
        term: {
          region_id: searchDeptorsIndivListDto?.fields?.region_id
        }
      });
    }

    if (searchDeptorsIndivListDto?.fields?.category) {
      deptorsIndivListMust.push({
        term: {
          category: searchDeptorsIndivListDto?.fields?.category
        }
      });
    }

    if (searchDeptorsIndivListDto?.fields?.name_first) {
      deptorsIndivListMust.push({
        match: {
          name_first: searchDeptorsIndivListDto?.fields?.name_first
        }
      });
    }

    if (searchDeptorsIndivListDto?.fields?.name_second) {
      deptorsIndivListMust.push({
        match: {
          name_second: searchDeptorsIndivListDto?.fields?.name_second
        }
      });
    }

    if (searchDeptorsIndivListDto?.fields?.name_family) {
      deptorsIndivListMust.push({
        match: {
          name_family: searchDeptorsIndivListDto?.fields?.name_family
        }
      });
    }

    if (searchDeptorsIndivListDto?.fields?.address) {
      deptorsIndivListMust.push({
        match: {
          address: searchDeptorsIndivListDto?.fields?.address
        }
      });
    }

    if (searchDeptorsIndivListDto?.fields?.code) {
      deptorsIndivListMust.push({
        multi_match: {
          query: searchDeptorsIndivListDto?.fields?.code,
          fields: ['code_inn', 'code_ogrnip', 'code_snils']
        }
      });
    }

    const { body } = await this.esService.search({
      index: MAIN_INDEX_NAME,
      body: {
        from: searchDeptorsIndivListDto?.pagination?.pageFrom || 0,
        size:
          searchDeptorsIndivListDto?.pagination?.pageSize ||
          DEPTORS_INDIV_LIST_DEFAULT_PAGE_SIZE,
        sort: [
          {
            id: {
              order: 'desc'
            }
          }
        ],
        query: {
          bool: {
            must: deptorsIndivListMust,
            filter: deptorsIndivListFilter
          }
        }
      }
    });

    return {
      page_results: body?.hits?.hits.map((item) => item._source),
      total_count: body?.hits.total
    };
  }
}
