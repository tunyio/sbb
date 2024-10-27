import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { MAIN_INDEX_NAME } from './search.constants';

@Injectable()
export class SearchCommonService {
  constructor(private readonly esService: ElasticsearchService) {}

  async indexDocument(index: string, doc: any): Promise<any> {
    doc.id = String(doc.id);

    return this.esService.index({
      index,
      body: doc
    });
  }

  async updateDocument(index: string, doc: any): Promise<any> {
    doc.id = String(doc.id);

    if (!doc._search_doc_type || !doc.id) return false;
    return this.esService.updateByQuery({
      index,
      body: {
        query: {
          bool: {
            must: [
              {
                term: {
                  _search_doc_type: doc._search_doc_type
                }
              },
              {
                term: {
                  id: doc.id
                }
              }
            ]
          }
        },
        script: {
          source: 'ctx._source = params',
          params: doc
        }
      }
    });
  }

  async getDocument(index: string, type: string, id: string): Promise<any> {
    const { body } = await this.esService.search({
      index,
      body: {
        query: {
          bool: {
            must: [
              {
                term: { _search_doc_type: type }
              },
              {
                term: { id }
              }
            ]
          }
        }
      }
    });

    return body?.hits.hits?.pop();
  }

  async removeDocument(index: string, type: string, id: string): Promise<any> {
    this.esService.deleteByQuery({
      index,
      body: {
        query: {
          bool: {
            must: [
              {
                term: { _search_doc_type: type }
              },
              {
                term: { id }
              }
            ]
          }
        }
      }
    });
  }

  async searchUserByName(name: string): Promise<any> {
    const { body } = await this.esService.search({
      index: MAIN_INDEX_NAME,
      body: {
        query: {
          multi_match: {
            query: name,
            fields: ['firstName', 'lastName']
          }
        }
      }
    });

    return {
      results: body?.hits.hits.map((item) => item._source),
      total: body?.hits.total
    };
  }

  async searchTasks(
    categoriesIds: number[] = [],
    coordinates: number[],
    distanceKilometers: number
  ): Promise<any> {
    const must = [];
    must.push({
      terms: {
        categoriesIds
      }
    });
    /*
    categoriesIds?.map((categoryId) =>
      must.push({
        terms: {
          categoriesIds: [categoryId],
        },
      }),
    );
    */
    if (coordinates && distanceKilometers) {
      must.push({
        nested: {
          path: 'addresses',
          query: {
            geo_distance: {
              distance: distanceKilometers + 'km',
              'addresses.coordinates': coordinates,
              distance_type: 'arc'
            }
          }
        }
      });
    }

    const { body } = await this.esService.search({
      index: MAIN_INDEX_NAME,
      body: {
        query: {
          bool: { must }
        }
        /*
        sort: [
          {
            _geo_distance: {
              nested_path: 'addresses',
              'addresses.coordinates': coordinates,
              unit: 'km',
              distance_type: 'plane',
              order: 'asc',
            },
          },
          {
            id: {
              order: 'asc',
            },
          },
        ],
        */
      }
    });

    return {
      results: body?.hits.hits.map((item) => item._source),
      total: body?.hits.total
    };
  }

  async searchChatMessages(
    userId: number,
    opponentId: number,
    to: Date,
    size: number,
    searchText = ''
  ): Promise<any> {
    const must: any = [
      {
        bool: {
          should: [
            {
              bool: {
                must: [
                  {
                    term: {
                      messageAuthorId: userId
                    }
                  },
                  {
                    term: {
                      deletedByAuthor: false
                    }
                  }
                ]
              }
            },
            {
              bool: {
                must: [
                  {
                    term: {
                      deletedByRecipient: false
                    }
                  },
                  {
                    term: {
                      messageRecipientId: userId
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ];
    if (searchText) {
      must.push({
        match: {
          messageText: searchText
        }
      });
    }

    const { body } = await this.esService.search({
      index: MAIN_INDEX_NAME,
      body: {
        from: 0,
        size,
        sort: [
          {
            messageCreatedAt: {
              order: 'desc'
            }
          }
        ],
        query: {
          bool: {
            must,
            filter: [
              {
                range: {
                  messageCreatedAt: {
                    lte: to
                  }
                }
              }
              // other date range conditions allowed here
            ],
            should: [
              {
                bool: {
                  must: [
                    {
                      term: {
                        messageAuthorId: userId
                      }
                    },
                    {
                      term: {
                        messageRecipientId: opponentId
                      }
                    }
                  ]
                }
              },
              {
                bool: {
                  must: [
                    {
                      term: {
                        messageAuthorId: opponentId
                      }
                    },
                    {
                      term: {
                        messageRecipientId: userId
                      }
                    }
                  ]
                }
              }
            ],
            minimum_should_match: 1
          }
        }
      }
    });

    return {
      results: body?.hits.hits.map((item) => item._source),
      total: body?.hits.total
    };
  }

  async createMainIndex() {
    const checkIndex = await this.esService.indices.exists({
      index: MAIN_INDEX_NAME
    });
    if (checkIndex.statusCode !== 404) return 'Main index already exists!';

    this.esService.indices.create({
      index: MAIN_INDEX_NAME,
      body: {
        settings: {
          analysis: {
            analyzer: {
              default: {
                type: 'custom',
                tokenizer: 'standard',
                filter: [
                  'lowercase',
                  // 'search_synonym',
                  'russian_morphology',
                  'english_morphology',
                  'ru_stopwords'
                ]
              },
              default_search: {
                type: 'custom',
                tokenizer: 'standard',
                filter: [
                  'lowercase',
                  // 'search_synonym',
                  'russian_morphology',
                  'english_morphology',
                  'ru_stopwords'
                ]
              }
            },
            filter: {
              /*
                search_synonym: {
                  ignore_case: 'true',
                  type: 'synonym',
                  synonyms: ['пончо,накидка'],
                },
                */
              ru_stopwords: {
                type: 'stop',
                stopwords:
                  'а,без,более,бы,был,была,были,было,быть,в,вам,вас,весь,во,вот,все,всего,всех,вы,где,да,даже,для,до,его,ее,если,есть,еще,же,за,здесь,и,из,или,им,их,к,как,ко,когда,кто,ли,либо,мне,может,мы,на,надо,наш,не,него,нее,нет,ни,них,но,ну,о,об,однако,он,она,они,оно,от,очень,по,под,при,с,со,так,также,такой,там,те,тем,то,того,тоже,той,только,том,ты,у,уже,хотя,чего,чей,чем,что,чтобы,чье,чья,эта,эти,это,я,a,an,and,are,as,at,be,but,by,for,if,in,into,is,it,no,not,of,on,or,such,that,the,their,then,there,these,they,this,to,was,will,with'
              }
            }
            /*
              tokenizer: {
                autocomplete: {
                  type: 'edge_ngram',
                  min_gram: 1,
                  max_gram: 20, // 20 instead of 30 recommends
                  token_chars: ['letter', 'digit', 'whitespace'],
                },
              },
              */
          }
        },
        mappings: {
          properties: {
            id: { type: 'keyword' },
            _search_doc_type: { type: 'keyword' },
            MessagesPublisherList: {
              type: 'nested',
              properties: {
                id: { type: 'keyword' },
                DictSro: {
                  type: 'nested',
                  properties: {
                    id: { type: 'keyword' }
                  }
                },
                ArbManagersList: {
                  type: 'nested',
                  properties: {
                    id: { type: 'keyword' },
                    DictSro: {
                      type: 'nested',
                      properties: {
                        id: { type: 'keyword' }
                      }
                    }
                  }
                },
                AuctionOrgsIndivList: {
                  type: 'nested',
                  properties: {
                    id: { type: 'keyword' }
                  }
                },
                AuctionOrgsLegalList: {
                  type: 'nested',
                  properties: {
                    id: { type: 'keyword' }
                  }
                }
              }
            },
            DeptorsIndivList: {
              type: 'nested',
              properties: {
                id: { type: 'keyword' }
              }
            },
            DeptorsLegalList: {
              type: 'nested',
              properties: {
                id: { type: 'keyword' }
              }
            }
            /*
             , title: {
                type: 'text',
                fields: {
                  complete: {
                    type: 'text',
                    analyzer: 'autocomplete_analyzer',
                    search_analyzer: 'autocomplete_search_analyzer',
                  },
                },
              },
              year: { type: 'integer' },
              details: { type: 'object' },
              */
          }
        }
      }
    });
    /*
    const body = await this.parseAndPrepareData();
    this.esService.bulk(
      {
        index,
        body,
      },
      (err) => {
        if (err) {
          console.error(err);
        }
      },
    );
    */
    return 'Main index successfully created!';
  }

  async parseAndPrepareData(index: string, listMovies = []) {
    const body = [];
    listMovies.map((item, id) => {
      const actorsData = [];
      item.actorsList.map((act) => {
        actorsData.push({ fName: act.split(' ')[0], sName: act.split(' ')[1] });
      });

      body.push(
        {
          index: {
            _index: index,
            _id: id
          }
        },
        {
          title: item.title,
          year: item.year,
          genres: item.genres.map((genre) => ({ genre })),
          actors: actorsData
        }
      );
    });
    return body;
  }
}
