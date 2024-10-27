import { Module, OnModuleInit } from '@nestjs/common';
import { SearchCommonService } from './search.common-service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchController } from './search.controller';
import { SearchMessagesListService } from './search.messages-list-service';
import { SearchDeptorsIndivListService } from './search.deptors-indiv-list-service';
import { SearchDeptorsLegalListService } from './search.deptors-legal-list-service';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
      auth: {
        username: process.env?.ELASTICSEARCH_USERNAME,
        password: process.env?.ELASTICSEARCH_PASSWORD
      },
      maxRetries: 10,
      requestTimeout: 60000,
      pingTimeout: 60000,
      sniffOnStart: true
    })
  ],
  controllers: [SearchController],
  providers: [
    SearchCommonService,
    SearchMessagesListService,
    SearchDeptorsIndivListService,
    SearchDeptorsLegalListService
  ],
  exports: [
    ElasticsearchModule,
    SearchMessagesListService,
    SearchDeptorsIndivListService,
    SearchDeptorsLegalListService
  ]
})
export class SearchModule implements OnModuleInit {
  constructor(private searchCommonService: SearchCommonService) {}
  onModuleInit() {
    this.searchCommonService.createMainIndex().then(console.log);
  }
}
