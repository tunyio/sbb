import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchCommonService } from './search.common-service';
import {
  MAIN_INDEX_NAME,
  MESSAGES_LIST_DEFAULT_PAGE_SIZE,
  MESSAGES_LIST_DOC_TYPE
} from './search.constants';
import { SearchMessagesListDto } from './dto/messages-list.dto';
import { MessagesListSearchDoc } from '../common/typing/based-on-prisma-models';

@Injectable()
export class SearchMessagesListService {
  constructor(
    private readonly esService: ElasticsearchService,
    private readonly searchCommonService: SearchCommonService
  ) {}

  public async indexMessagesListDoc(
    messagesListDoc: MessagesListSearchDoc
  ): Promise<any> {
    const exists = await this.getMessagesListDoc(messagesListDoc.id);

    if (!exists) return this.addMessagesListDoc(messagesListDoc);
    else return this.updateMessagesListDoc(messagesListDoc);
  }

  private async getMessagesListDoc(
    docPgId: number | string
  ): Promise<MessagesListSearchDoc | undefined> {
    return (
      await this.searchCommonService.getDocument(
        MAIN_INDEX_NAME,
        MESSAGES_LIST_DOC_TYPE,
        String(docPgId)
      )
    )?._source as unknown as MessagesListSearchDoc;
  }

  private async addMessagesListDoc(
    messagesListDoc: MessagesListSearchDoc
  ): Promise<any> {
    return this.searchCommonService.indexDocument(MAIN_INDEX_NAME, {
      _search_doc_type: MESSAGES_LIST_DOC_TYPE,
      ...messagesListDoc
    });
  }

  private async updateMessagesListDoc(
    messagesListDoc: MessagesListSearchDoc
  ): Promise<any> {
    return this.searchCommonService.updateDocument(MAIN_INDEX_NAME, {
      _search_doc_type: MESSAGES_LIST_DOC_TYPE,
      ...messagesListDoc
    });
  }

  public async removeMessagesListDoc(docPgId: number | string) {
    return this.searchCommonService.removeDocument(
      MAIN_INDEX_NAME,
      MESSAGES_LIST_DOC_TYPE,
      String(docPgId)
    );
  }

  public async searchMessagesListDocs(
    searchMessagesListDto: SearchMessagesListDto
  ): Promise<any> {
    const messagesListMust: any[] = [];
    const messagesListFilter: any[] = [];

    if (searchMessagesListDto?.fields?.number) {
      messagesListMust.push({
        term: {
          number: searchMessagesListDto?.fields?.number
        }
      });
    }
    if (searchMessagesListDto?.fields?.message_type_id) {
      messagesListMust.push({
        term: {
          message_type_id: searchMessagesListDto?.fields?.message_type_id
        }
      });
    }
    if (searchMessagesListDto?.fields?.status) {
      messagesListMust.push({
        term: {
          status: searchMessagesListDto?.fields?.status
        }
      });
    }

    const pubDateStart = searchMessagesListDto?.fields?.publication_date_start;
    const pubDateEnd = searchMessagesListDto?.fields?.publication_date_end;
    if (pubDateStart || pubDateEnd) {
      const pubDateRange = {};
      if (pubDateStart) pubDateRange['gte'] = new Date(pubDateStart);
      if (pubDateEnd) pubDateRange['lte'] = new Date(pubDateEnd);

      messagesListFilter.push({
        range: {
          publication_date: pubDateRange
        }
      });
    }

    this.includeMessagesPublisherList(searchMessagesListDto, messagesListMust);
    this.includeDeptorsLists(searchMessagesListDto, messagesListMust);

    const { body } = await this.esService.search({
      index: MAIN_INDEX_NAME,
      body: {
        from: searchMessagesListDto?.pagination?.pageFrom || 0,
        size:
          searchMessagesListDto?.pagination?.pageSize ||
          MESSAGES_LIST_DEFAULT_PAGE_SIZE,
        sort: [
          {
            publication_date: {
              order: 'desc'
            }
          }
        ],
        query: {
          bool: {
            must: messagesListMust,
            filter: messagesListFilter
          }
        }
      }
    });

    return {
      page_results: body?.hits?.hits.map((item) => item._source),
      total_count: body?.hits.total
    };
  }

  private includeMessagesPublisherList(
    searchMessagesListDto: SearchMessagesListDto,
    messagesListMust: any[]
  ) {
    if (searchMessagesListDto?.fields?.MessagesPublisherList?.type) {
      messagesListMust.push({
        nested: {
          path: 'MessagesPublisherList',
          query: {
            bool: {
              must: [
                {
                  term: {
                    'MessagesPublisherList.type':
                      searchMessagesListDto?.fields?.MessagesPublisherList?.type
                  }
                }
              ]
            }
          }
        }
      });
    }

    if (searchMessagesListDto?.fields?.MessagesPublisherList?.DictSro?.code) {
      messagesListMust.push({
        nested: {
          path: 'MessagesPublisherList',
          query: {
            nested: {
              path: 'MessagesPublisherList.DictSro',
              query: {
                bool: {
                  must: [
                    {
                      term: {
                        'MessagesPublisherList.DictSro.code':
                          searchMessagesListDto?.fields?.MessagesPublisherList
                            ?.DictSro?.code
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      });
    }

    if (searchMessagesListDto?.fields?.MessagesPublisherList?.DictSro?.title) {
      messagesListMust.push({
        nested: {
          path: 'MessagesPublisherList',
          query: {
            nested: {
              path: 'MessagesPublisherList.DictSro',
              query: {
                bool: {
                  must: [
                    {
                      match: {
                        'MessagesPublisherList.DictSro.title':
                          searchMessagesListDto?.fields?.MessagesPublisherList
                            ?.DictSro?.title
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      });
    }

    if (
      searchMessagesListDto?.fields?.MessagesPublisherList?.DictSro
        ?.register_number
    ) {
      messagesListMust.push({
        nested: {
          path: 'MessagesPublisherList',
          query: {
            nested: {
              path: 'MessagesPublisherList.DictSro',
              query: {
                bool: {
                  must: [
                    {
                      term: {
                        'MessagesPublisherList.DictSro.register_number':
                          searchMessagesListDto?.fields?.MessagesPublisherList
                            ?.DictSro?.register_number
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      });
    }

    if (
      searchMessagesListDto?.fields?.MessagesPublisherList?.ArbManagersList
        ?.name_first
    ) {
      messagesListMust.push({
        nested: {
          path: 'MessagesPublisherList',
          query: {
            nested: {
              path: 'MessagesPublisherList.ArbManagersList',
              query: {
                bool: {
                  must: [
                    {
                      match: {
                        'MessagesPublisherList.ArbManagersList.name_first':
                          searchMessagesListDto?.fields?.MessagesPublisherList
                            ?.ArbManagersList?.name_first
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      });
    }

    if (
      searchMessagesListDto?.fields?.MessagesPublisherList?.ArbManagersList
        ?.name_second
    ) {
      messagesListMust.push({
        nested: {
          path: 'MessagesPublisherList',
          query: {
            nested: {
              path: 'MessagesPublisherList.ArbManagersList',
              query: {
                bool: {
                  must: [
                    {
                      match: {
                        'MessagesPublisherList.ArbManagersList.name_second':
                          searchMessagesListDto?.fields?.MessagesPublisherList
                            ?.ArbManagersList?.name_second
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      });
    }

    if (
      searchMessagesListDto?.fields?.MessagesPublisherList?.ArbManagersList
        ?.name_family
    ) {
      messagesListMust.push({
        nested: {
          path: 'MessagesPublisherList',
          query: {
            nested: {
              path: 'MessagesPublisherList.ArbManagersList',
              query: {
                bool: {
                  must: [
                    {
                      match: {
                        'MessagesPublisherList.ArbManagersList.name_family':
                          searchMessagesListDto?.fields?.MessagesPublisherList
                            ?.ArbManagersList?.name_family
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      });
    }

    if (
      searchMessagesListDto?.fields?.MessagesPublisherList?.ArbManagersList
        ?.name_full
    ) {
      messagesListMust.push({
        nested: {
          path: 'MessagesPublisherList',
          query: {
            nested: {
              path: 'MessagesPublisherList.ArbManagersList',
              query: {
                bool: {
                  must: [
                    {
                      match: {
                        'MessagesPublisherList.ArbManagersList.name_full':
                          searchMessagesListDto?.fields?.MessagesPublisherList
                            ?.ArbManagersList?.name_full
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      });
    }

    if (
      searchMessagesListDto?.fields?.MessagesPublisherList?.ArbManagersList
        ?.registry_number
    ) {
      messagesListMust.push({
        nested: {
          path: 'MessagesPublisherList',
          query: {
            nested: {
              path: 'MessagesPublisherList.ArbManagersList',
              query: {
                bool: {
                  must: [
                    {
                      term: {
                        'MessagesPublisherList.ArbManagersList.registry_number':
                          searchMessagesListDto?.fields?.MessagesPublisherList
                            ?.ArbManagersList?.registry_number
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      });
    }

    if (
      searchMessagesListDto?.fields?.MessagesPublisherList?.ArbManagersList
        ?.DictSro?.code
    ) {
      messagesListMust.push({
        nested: {
          path: 'MessagesPublisherList',
          query: {
            nested: {
              path: 'MessagesPublisherList.ArbManagersList',
              query: {
                nested: {
                  path: 'MessagesPublisherList.ArbManagersList.DictSro',
                  query: {
                    bool: {
                      must: [
                        {
                          term: {
                            'MessagesPublisherList.ArbManagersList.DictSro.code':
                              searchMessagesListDto?.fields?.MessagesPublisherList
                                ?.ArbManagersList?.DictSro?.code
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      });
    }

    if (
      searchMessagesListDto?.fields?.MessagesPublisherList?.ArbManagersList
        ?.DictSro?.title
    ) {
      messagesListMust.push({
        nested: {
          path: 'MessagesPublisherList',
          query: {
            nested: {
              path: 'MessagesPublisherList.ArbManagersList',
              query: {
                nested: {
                  path: 'MessagesPublisherList.ArbManagersList.DictSro',
                  query: {
                    bool: {
                      must: [
                        {
                          match: {
                            'MessagesPublisherList.ArbManagersList.DictSro.title':
                              searchMessagesListDto?.fields?.MessagesPublisherList
                                ?.ArbManagersList?.DictSro?.title
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      });
    }

    if (
      searchMessagesListDto?.fields?.MessagesPublisherList?.ArbManagersList
        ?.DictSro?.register_number
    ) {
      messagesListMust.push({
        nested: {
          path: 'MessagesPublisherList',
          query: {
            nested: {
              path: 'MessagesPublisherList.ArbManagersList',
              query: {
                nested: {
                  path: 'MessagesPublisherList.ArbManagersList.DictSro',
                  query: {
                    bool: {
                      must: [
                        {
                          term: {
                            'MessagesPublisherList.ArbManagersList.DictSro.register_number':
                              searchMessagesListDto?.fields?.MessagesPublisherList
                                ?.ArbManagersList?.DictSro?.register_number
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      });
    }

    if (
      searchMessagesListDto?.fields?.MessagesPublisherList?.AuctionOrgsIndivList
        ?.name_first
    ) {
      messagesListMust.push({
        nested: {
          path: 'MessagesPublisherList',
          query: {
            nested: {
              path: 'MessagesPublisherList.AuctionOrgsIndivList',
              query: {
                bool: {
                  must: [
                    {
                      match: {
                        'MessagesPublisherList.AuctionOrgsIndivList.name_first':
                          searchMessagesListDto?.fields?.MessagesPublisherList
                            ?.AuctionOrgsIndivList?.name_first
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      });
    }

    if (
      searchMessagesListDto?.fields?.MessagesPublisherList?.AuctionOrgsIndivList
        ?.name_second
    ) {
      messagesListMust.push({
        nested: {
          path: 'MessagesPublisherList',
          query: {
            nested: {
              path: 'MessagesPublisherList.AuctionOrgsIndivList',
              query: {
                bool: {
                  must: [
                    {
                      match: {
                        'MessagesPublisherList.AuctionOrgsIndivList.name_second':
                          searchMessagesListDto?.fields?.MessagesPublisherList
                            ?.AuctionOrgsIndivList?.name_second
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      });
    }

    if (
      searchMessagesListDto?.fields?.MessagesPublisherList?.AuctionOrgsIndivList
        ?.name_family
    ) {
      messagesListMust.push({
        nested: {
          path: 'MessagesPublisherList',
          query: {
            nested: {
              path: 'MessagesPublisherList.AuctionOrgsIndivList',
              query: {
                bool: {
                  must: [
                    {
                      match: {
                        'MessagesPublisherList.AuctionOrgsIndivList.name_family':
                          searchMessagesListDto?.fields?.MessagesPublisherList
                            ?.AuctionOrgsIndivList?.name_family
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      });
    }

    if (
      searchMessagesListDto?.fields?.MessagesPublisherList?.AuctionOrgsLegalList
        ?.name
    ) {
      messagesListMust.push({
        nested: {
          path: 'MessagesPublisherList',
          query: {
            nested: {
              path: 'MessagesPublisherList.AuctionOrgsLegalList',
              query: {
                bool: {
                  must: [
                    {
                      match: {
                        'MessagesPublisherList.AuctionOrgsLegalList.name':
                          searchMessagesListDto?.fields?.MessagesPublisherList
                            ?.AuctionOrgsLegalList?.name
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      });
    }

    if (
      searchMessagesListDto?.fields?.MessagesPublisherList?.AuctionOrgsLegalList
        ?.address
    ) {
      messagesListMust.push({
        nested: {
          path: 'MessagesPublisherList',
          query: {
            nested: {
              path: 'MessagesPublisherList.AuctionOrgsLegalList',
              query: {
                bool: {
                  must: [
                    {
                      match: {
                        'MessagesPublisherList.AuctionOrgsLegalList.address':
                          searchMessagesListDto?.fields?.MessagesPublisherList
                            ?.AuctionOrgsLegalList?.address
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      });
    }
  }

  private includeDeptorsLists(
    searchMessagesListDto: SearchMessagesListDto,
    messagesListMust: any[]
  ) {
    if (searchMessagesListDto?.fields?.DeptorsIndivList?.region_id) {
      messagesListMust.push({
        nested: {
          path: 'DeptorsIndivList',
          query: {
            bool: {
              must: [
                {
                  term: {
                    'DeptorsIndivList.region_id':
                      searchMessagesListDto?.fields?.DeptorsIndivList?.region_id
                  }
                }
              ]
            }
          }
        }
      });
    }

    if (searchMessagesListDto?.fields?.DeptorsIndivList?.category) {
      messagesListMust.push({
        nested: {
          path: 'DeptorsIndivList',
          query: {
            bool: {
              must: [
                {
                  term: {
                    'DeptorsIndivList.category':
                      searchMessagesListDto?.fields?.DeptorsIndivList?.category
                  }
                }
              ]
            }
          }
        }
      });
    }

    if (searchMessagesListDto?.fields?.DeptorsIndivList?.name_first) {
      messagesListMust.push({
        nested: {
          path: 'DeptorsIndivList',
          query: {
            bool: {
              must: [
                {
                  match: {
                    'DeptorsIndivList.name_first':
                      searchMessagesListDto?.fields?.DeptorsIndivList?.name_first
                  }
                }
              ]
            }
          }
        }
      });
    }

    if (searchMessagesListDto?.fields?.DeptorsIndivList?.name_second) {
      messagesListMust.push({
        nested: {
          path: 'DeptorsIndivList',
          query: {
            bool: {
              must: [
                {
                  match: {
                    'DeptorsIndivList.name_second':
                      searchMessagesListDto?.fields?.DeptorsIndivList?.name_second
                  }
                }
              ]
            }
          }
        }
      });
    }

    if (searchMessagesListDto?.fields?.DeptorsIndivList?.name_family) {
      messagesListMust.push({
        nested: {
          path: 'DeptorsIndivList',
          query: {
            bool: {
              must: [
                {
                  match: {
                    'DeptorsIndivList.name_family':
                      searchMessagesListDto?.fields?.DeptorsIndivList?.name_family
                  }
                }
              ]
            }
          }
        }
      });
    }

    if (searchMessagesListDto?.fields?.DeptorsIndivList?.address) {
      messagesListMust.push({
        nested: {
          path: 'DeptorsIndivList',
          query: {
            bool: {
              must: [
                {
                  match: {
                    'DeptorsIndivList.address':
                      searchMessagesListDto?.fields?.DeptorsIndivList?.address
                  }
                }
              ]
            }
          }
        }
      });
    }

    if (searchMessagesListDto?.fields?.DeptorsIndivList?.code) {
      messagesListMust.push({
        nested: {
          path: 'DeptorsIndivList',
          query: {
            bool: {
              must: [
                {
                  multi_match: {
                    query: searchMessagesListDto?.fields?.DeptorsIndivList?.code,
                    fields: [
                      'DeptorsIndivList.code_inn',
                      'DeptorsIndivList.code_ogrnip',
                      'DeptorsIndivList.code_snils'
                    ]
                  }
                }
              ]
            }
          }
        }
      });
    }

    if (searchMessagesListDto?.fields?.DeptorsLegalList?.region_id) {
      messagesListMust.push({
        nested: {
          path: 'DeptorsLegalList',
          query: {
            bool: {
              must: [
                {
                  term: {
                    'DeptorsLegalList.region_id':
                      searchMessagesListDto?.fields?.DeptorsLegalList?.region_id
                  }
                }
              ]
            }
          }
        }
      });
    }

    if (searchMessagesListDto?.fields?.DeptorsLegalList?.category) {
      messagesListMust.push({
        nested: {
          path: 'DeptorsLegalList',
          query: {
            bool: {
              must: [
                {
                  term: {
                    'DeptorsLegalList.category':
                      searchMessagesListDto?.fields?.DeptorsLegalList?.category
                  }
                }
              ]
            }
          }
        }
      });
    }

    if (searchMessagesListDto?.fields?.DeptorsLegalList?.name) {
      messagesListMust.push({
        nested: {
          path: 'DeptorsLegalList',
          query: {
            bool: {
              must: [
                {
                  match: {
                    'DeptorsLegalList.name':
                      searchMessagesListDto?.fields?.DeptorsLegalList?.name
                  }
                }
              ]
            }
          }
        }
      });
    }

    if (searchMessagesListDto?.fields?.DeptorsLegalList?.address) {
      messagesListMust.push({
        nested: {
          path: 'DeptorsLegalList',
          query: {
            bool: {
              must: [
                {
                  match: {
                    'DeptorsLegalList.address':
                      searchMessagesListDto?.fields?.DeptorsLegalList?.address
                  }
                }
              ]
            }
          }
        }
      });
    }

    if (searchMessagesListDto?.fields?.DeptorsLegalList?.code) {
      messagesListMust.push({
        nested: {
          path: 'DeptorsLegalList',
          query: {
            bool: {
              must: [
                {
                  multi_match: {
                    query: searchMessagesListDto?.fields?.DeptorsLegalList?.code,
                    fields: [
                      'DeptorsLegalList.code_inn',
                      'DeptorsLegalList.code_ogrn',
                      'DeptorsLegalList.code_okpo'
                    ]
                  }
                }
              ]
            }
          }
        }
      });
    }
  }
}
