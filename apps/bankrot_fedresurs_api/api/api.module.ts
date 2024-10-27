import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { QueueApiModule } from '../queue/api/queue-api.module';
import { RegionModule } from '../dictionaries/region';
import { SroModule } from '../dictionaries/sro';
import { ArbitrationCourtModule } from '../dictionaries/arbitration-court';
import { OkopfModule } from '../dictionaries/okopf';
import { MessageTypeModule } from '../dictionaries/message-type';
import { ArbManagersListModule } from '../arb-managers/list';
import { AuctionOrgsIndivListModule } from '../auction-orgs/indiv-list';
import { AuctionOrgsLegalListModule } from '../auction-orgs/legal-list';
import { DeptorsIndivListModule } from '../deptors/indiv-list';
import { DeptorsLegalListModule } from '../deptors/legal-list';
import { MessagesListModule } from '../messages/list';
import { MessagesPublisherListModule } from '../messages/publisher-list';
import { UsersListModule } from '../users/list';
import { UsersListRolePivotModule } from '../users/list-role-pivot';
import { UsersRoleModule } from '../users/role';
import { UsersContactsModule } from '../users/contact';
import { AuthModule } from '../auth';
import { EMailModule } from '../e-mail';
import { MinioModule } from '../s3';
import { AdminsModule } from '../admins';
import { SearchModule } from '../search';
import { BackgroundJobsModule } from '../background-jobs/background-jobs.module';
import { FileModule } from '../file/file.module';
import { AuctPlatformsSroModule } from '../dictionaries/auct-platforms-sro';
import { AuctPlatformsModule } from '../dictionaries/auct-platforms';
import { ArbManagersActionsModule } from '../arb-managers/actions';
import { ArbManagersReportsModule } from '../arb-managers/reports';
import { AuctionsPlatformListModule } from '../auctions/platform-list';
import { AuctionsListModule } from '../auctions/list';
import { FinancesActionsModule } from '../finances/actions';
import { FinancesBillsModule } from '../finances/bills';

@Module({
  imports: [
    BackgroundJobsModule,
    SearchModule,
    QueueApiModule,
    AdminsModule,
    AuthModule,
    MinioModule,
    FileModule,
    EMailModule,
    ArbManagersListModule,
    ArbManagersActionsModule,
    ArbManagersReportsModule,
    AuctionOrgsIndivListModule,
    AuctionOrgsLegalListModule,
    AuctionsListModule,
    AuctionsPlatformListModule,
    DeptorsIndivListModule,
    DeptorsLegalListModule,
    MessagesListModule,
    MessagesPublisherListModule,
    UsersListModule,
    UsersListRolePivotModule,
    UsersRoleModule,
    UsersContactsModule,
    RegionModule,
    AuctPlatformsSroModule,
    AuctPlatformsModule,
    SroModule,
    ArbitrationCourtModule,
    OkopfModule,
    MessageTypeModule,
    FinancesActionsModule,
    FinancesBillsModule
  ],
  controllers: [ApiController],
  providers: [ApiService]
})
export class ApiModule {}
