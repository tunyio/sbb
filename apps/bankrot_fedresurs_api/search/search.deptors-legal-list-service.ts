import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchCommonService } from './search.common-service';
import {
  MAIN_INDEX_NAME,
  DEPTORS_LEGAL_LIST_DEFAULT_PAGE_SIZE,
  DEPTORS_LEGAL_LIST_DOC_TYPE
} from './search.constants';
import { SearchDeptorsLegalListDto } from './dto/deptors-legal-list.dto';
import { DeptorsLegalListSearchDoc } from '../common/typing/based-on-prisma-models';

@Injectable()
export class SearchDeptorsLegalListService {
  constructor(
    private readonly esService: ElasticsearchService,
    private readonly searchCommonService: SearchCommonService
  ) {}

  public async indexDeptorsLegalListDoc(
    deptorsLegalListDoc: DeptorsLegalListSearchDoc
  ): Promise<any> {
    const exists = await this.getDeptorsLegalListDoc(deptorsLegalListDoc.id);

    if (!exists) return this.addDeptorsLegalListDoc(deptorsLegalListDoc);
    else return this.updateDeptorsLegalListDoc(deptorsLegalListDoc);
  }

  private async getDeptorsLegalListDoc(
    docPgId: number | string
  ): Promise<DeptorsLegalListSearchDoc | undefined> {
    return (
      await this.searchCommonService.getDocument(
        MAIN_INDEX_NAME,
        DEPTORS_LEGAL_LIST_DOC_TYPE,
        String(docPgId)
      )
    )?._source as unknown as DeptorsLegalListSearchDoc;
  }

  private async addDeptorsLegalListDoc(
    deptorsLegalListDoc: DeptorsLegalListSearchDoc
  ): Promise<any> {
    return this.searchCommonService.indexDocument(MAIN_INDEX_NAME, {
      _search_doc_type: DEPTORS_LEGAL_LIST_DOC_TYPE,
      ...deptorsLegalListDoc
    });
  }

  private async updateDeptorsLegalListDoc(
    deptorsLegalListDoc: DeptorsLegalListSearchDoc
  ): Promise<any> {
    return this.searchCommonService.updateDocument(MAIN_INDEX_NAME, {
      _search_doc_type: DEPTORS_LEGAL_LIST_DOC_TYPE,
      ...deptorsLegalListDoc
    });
  }

  public async removeDeptorsLegalListDoc(docPgId: number | string) {
    return this.searchCommonService.removeDocument(
      MAIN_INDEX_NAME,
      DEPTORS_LEGAL_LIST_DOC_TYPE,
      String(docPgId)
    );
  }

  public async searchDeptorsLegalListDocs(
    searchDeptorsLegalListDto: SearchDeptorsLegalListDto
  ): Promise<any> {
    const deptorsLegalListMust: any[] = [];
    const deptorsLegalListFilter: any[] = [];

    if (searchDeptorsLegalListDto?.fields?.region_id) {
      deptorsLegalListMust.push({
        term: {
          region_id: searchDeptorsLegalListDto?.fields?.region_id
        }
      });
    }

    if (searchDeptorsLegalListDto?.fields?.category) {
      deptorsLegalListMust.push({
        term: {
          category: searchDeptorsLegalListDto?.fields?.category
        }
      });
    }

    if (searchDeptorsLegalListDto?.fields?.name) {
      deptorsLegalListMust.push({
        match: {
          name: searchDeptorsLegalListDto?.fields?.name
        }
      });
    }

    if (searchDeptorsLegalListDto?.fields?.address) {
      deptorsLegalListMust.push({
        match: {
          address: searchDeptorsLegalListDto?.fields?.address
        }
      });
    }

    if (searchDeptorsLegalListDto?.fields?.code) {
      deptorsLegalListMust.push({
        multi_match: {
          query: searchDeptorsLegalListDto?.fields?.code,
          fields: ['code_inn', 'code_ogrn', 'code_okpo']
        }
      });
    }

    const { body } = await this.esService.search({
      index: MAIN_INDEX_NAME,
      body: {
        from: searchDeptorsLegalListDto?.pagination?.pageFrom || 0,
        size:
          searchDeptorsLegalListDto?.pagination?.pageSize ||
          DEPTORS_LEGAL_LIST_DEFAULT_PAGE_SIZE,
        sort: [
          {
            id: {
              order: 'desc'
            }
          }
        ],
        query: {
          bool: {
            must: deptorsLegalListMust,
            filter: deptorsLegalListFilter
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
