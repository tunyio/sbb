import type { Prisma, PrismaClient } from '@prisma/client';

type ModelNames = Prisma.ModelName; // "UsersList" | "UsersRoles" | "UsersContacts"

export type PrismaModels = {
  [M in ModelNames]: Exclude<
    Awaited<ReturnType<PrismaClient[Uncapitalize<M>]['findUnique']>>,
    null
  >;
};

export type UsersContacts = PrismaModels['UsersContacts'];
export type UsersRolesPivot = PrismaModels['UsersRolesPivot'] & {
  UsersRoles: PrismaModels['UsersRoles'];
};
export type DataForAdmin = PrismaModels['AdminsList'];
export type DataNotAdmin = PrismaModels['UsersList'] & {
  UsersContacts: UsersContacts[];
  UsersRolesPivot: UsersRolesPivot[];
};
export type PassportUser = {
  isAdmin: boolean;
  data_for_admin: DataForAdmin;
  data_not_admin: DataNotAdmin;
};

export type DeptorsIndivListSearchDoc = PrismaModels['DeptorsIndivList'];
export type DeptorsLegalListSearchDoc = PrismaModels['DeptorsLegalList'];
export type MessagesPublisherListSearchDoc =
  PrismaModels['MessagesPublisherList'] & {
    DictSro: PrismaModels['DictSro'];
    ArbManagersList: PrismaModels['ArbManagersList'] & {
      DictSro: PrismaModels['DictSro'];
    };
    AuctionOrgsIndivList: PrismaModels['AuctionOrgsIndivList'];
    AuctionOrgsLegalList: PrismaModels['AuctionOrgsLegalList'];
  };
export type MessagesListSearchDoc = PrismaModels['MessagesList'] & {
  MessagesPublisherList: MessagesPublisherListSearchDoc;
  DeptorsIndivList: PrismaModels['DeptorsIndivList'];
  DeptorsLegalList: PrismaModels['DeptorsLegalList'];
};
