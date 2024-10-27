CREATE TYPE "message_status" AS ENUM (
  'opublikovano',
  'podpisano',
  'nepodpisano'
  );

CREATE TYPE "applicant_type" AS ENUM (
  'konkursnii_kreditor',
  'upolnomochennii_organ',
  'rabotnik_dolzhnika_ili_predstavitel_rabotnikov_dolzhnika',
  'gosudarstvennii_kontrolnii_organ',
  'dolzhnik'
  );

CREATE TYPE "individuals_debtors_status" AS ENUM (
  'individualnii_predprinimatel',
  'krestyanskoe_fermerskoe_khozyaistvo',
  'otsutstvuyushchii_dolzhnik',
  'fizicheskoe_litso'
  );

CREATE TYPE "legal_entities_debtors_status" AS ENUM (
  'gradoobrazuyushchaya_organizatsiya',
  'zastroishchik',
  'inaya_finansovaya_organizatsiya',
  'kreditnaya_organizatsiya',
  'likvidiruemii_dolzhnik',
  'negosudarstvennii_pensionnii_fond',
  'obichnaya_organizatsiya',
  'otsutstvuyushchii_dolzhnik',
  'selskokhozyaistvennaya_organizatsiya',
  'strategicheskoe_predpriyatie_i_organizatsiya',
  'subekt_yestestvennikh_monopolii',
  'strakhovaya_organizatsiya'
  );

CREATE TYPE "message_publisher" AS ENUM (
  'arbitrazhnii_upravlyayushchii',
  'organizator_torgov_yuridicheskoe_litso',
  'organizator_torgov_fizicheskoe_litso',
  'sro_au',
  'yuridicheskoe_litso',
  'fizicheskoe_litso',
  'publikator_fns',
  'prochie_gos_korporatsiya_agentstvo_po_strakhovaniyu_vkladov',
  'prochie_tsentralnii_bank_rf',
  'prochie_federalnaya_sluzhba_sudebnikh_pristavov',
  'prochie_federalnaya_nalogovaya_sluzhba',
  'prochie_operator_efrsb'
  );

CREATE TYPE "procedure_ending_reason" AS ENUM (
  'proizvodstvo_po_delu_zaversheno',
  'proizvodstvo_po_delu_prekrashcheno',
  'otkaz_v_priznanii_dolzhnika_bankrotom',
  'inoe'
  );

CREATE TYPE "user_role" AS ENUM (
  'arbitrazhnii_upravlyayushchii'
  );

CREATE TYPE "finances_actions_type" AS ENUM (
  'prihod',
  'rashod'
  );

CREATE TYPE "finances_actions_description" AS ENUM (
  'popolnenie_litsevogo_scheta',
  'publikatsiya_soobsheniya'
  );

CREATE TYPE "finances_bills_status" AS ENUM (
  'ne_oplachen',
  'oplachen'
  );

CREATE TYPE "arb_manager_actions_type" AS ENUM (
  'sobitie_o_chlenstve_v_sro'
  );

CREATE TYPE "arb_manager_actions_description" AS ENUM (
  'vklyuchenie_v_sro',
  'isklyuchenie_iz_sro'
  );

CREATE TYPE "arb_manager_report_type" AS ENUM (
  'finalnii_otchet',
  'promezhutochnii_ochet'
  );

CREATE TYPE "arb_manager_reports_procedure_type" AS ENUM (
  'deistviya_v_otnoshenii_dolzhnika'
  );

CREATE TYPE "courts_cases_status" AS ENUM (
  'aktivno',
  'zaversheno_prekrashcheno'
  );

CREATE TYPE "courts_cases_deptor_status" AS ENUM (
  'deistvuyushchii',
  'isklyuchen_iz_egryul'
  );

CREATE TYPE "courts_cases_procedure_termn_reason" AS ENUM (
  'prekratit'
  );

CREATE TYPE "auctions_type" AS ENUM (
  'publichnoe_predlozhenie',
  'auktsion'
  );

CREATE TYPE "auctions_status" AS ENUM (
  'nachati'
  );

CREATE TYPE "auctions_price_proposal_submission_form" AS ENUM (
  'otkritaya',
  'zakritaya'
  );

CREATE TYPE "sro_document_type" AS ENUM (
  'svedeniya_o_filialakh_i_predstavitelstvakh',
  'uchreditelnie_dokumenti'
  );

CREATE TYPE "fns_actions_type" AS ENUM (
  'dobavlenie_k_spisku',
  'neuchet',
  'vibor_dlya_zayavleniya'
  );

CREATE TABLE "DictRegion" (
                            "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                            "deleted_at" timestamp,
                            "okato_oktmo_code" varchar UNIQUE,
                            "title" varchar NOT NULL
);

CREATE TABLE "DictAuctPlatforms" (
                                   "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                   "deleted_at" timestamp,
                                   "title" varchar NOT NULL
);

CREATE TABLE "DictAuctPlatformsSro" (
                                      "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                      "deleted_at" timestamp,
                                      "code" varchar UNIQUE NOT NULL,
                                      "title" varchar NOT NULL,
                                      "register_number" varchar
);

CREATE TABLE "DictSro" (
                         "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                         "deleted_at" timestamp,
                         "code" varchar UNIQUE NOT NULL,
                         "title" varchar NOT NULL,
                         "register_number" varchar,
                         "document_type" sro_document_type
);

CREATE TABLE "DictArbitrationCourts" (
                                       "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                       "deleted_at" timestamp,
                                       "title" varchar NOT NULL
);

CREATE TABLE "DictOkopf" (
                           "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                           "deleted_at" timestamp,
                           "code" integer UNIQUE NOT NULL,
                           "title" varchar NOT NULL,
                           "canceled" bool DEFAULT false,
                           "parent_id" integer
);

CREATE TABLE "DictMessageTypes" (
                                  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                  "deleted_at" timestamp,
                                  "code" varchar UNIQUE NOT NULL,
                                  "title" varchar NOT NULL,
                                  "parent_id" integer
);

CREATE TABLE "UsersList" (
                           "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                           "deleted_at" timestamp,
                           "blocked" bool,
                           "blocked_reason" text,
                           "login" varchar UNIQUE NOT NULL,
                           "passw_hash" varchar
);

CREATE TABLE "UsersRoles" (
                            "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                            "deleted_at" timestamp,
                            "code" user_role UNIQUE NOT NULL
);

CREATE TABLE "UsersRolesPivot" (
                                 "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                 "user_id" integer NOT NULL,
                                 "user_role_id" integer NOT NULL,
                                 "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "UsersContacts" (
                               "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                               "deleted_at" timestamp,
                               "user_id" integer NOT NULL,
                               "email" varchar UNIQUE,
                               "email_passw_reset_token" varchar
);

CREATE TABLE "ArbManagersList" (
                                 "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                 "deleted_at" timestamp,
                                 "user_id" integer UNIQUE NOT NULL,
                                 "name_first" varchar,
                                 "name_second" varchar,
                                 "name_family" varchar,
                                 "name_full" varchar,
                                 "registry_number" varchar,
                                 "sro_id" integer
);

CREATE TABLE "ArbManagersActions" (
                                    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                    "deleted_at" timestamp,
                                    "arb_manager_id" integer UNIQUE NOT NULL,
                                    "type" arb_manager_actions_type,
                                    "desc" arb_manager_actions_description
);

CREATE TABLE "ArbManagersReports" (
                                    "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                    "deleted_at" timestamp,
                                    "arb_manager_id" integer UNIQUE NOT NULL,
                                    "type" arb_manager_report_type,
                                    "procedure_type" arb_manager_reports_procedure_type
);

CREATE TABLE "MessagesList" (
                              "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                              "updated_at" timestamp DEFAULT (now()),
                              "deleted_at" timestamp,
                              "number" INTEGER GENERATED BY DEFAULT AS IDENTITY,
                              "message_type_id" integer,
                              "status" message_status,
                              "publication_date" timestamp NOT NULL,
                              "publisher_id" integer NOT NULL,
                              "blocked" bool,
                              "blocked_reason" text,
                              "deptor_legal_id" integer,
                              "deptor_indiv_id" integer
);

CREATE TABLE "MessagesPublisherList" (
                                       "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                       "deleted_at" timestamp,
                                       "type" message_publisher NOT NULL,
                                       "arb_manager_id" integer,
                                       "auction_org_legal_id" integer,
                                       "auction_org_indiv_id" integer,
                                       "sro_id" integer
);

CREATE TABLE "AuctionOrgsLegalList" (
                                      "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                      "deleted_at" timestamp,
                                      "name" varchar,
                                      "address" text
);

CREATE TABLE "AuctionOrgsIndivList" (
                                      "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                      "deleted_at" timestamp,
                                      "name_first" varchar,
                                      "name_second" varchar,
                                      "name_family" varchar,
                                      "name_full" varchar,
                                      "address" text
);

CREATE TABLE "AuctionsList" (
                              "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                              "deleted_at" timestamp,
                              "type" auctions_type,
                              "status" auctions_status,
                              "platform_id" integer,
                              "orgs_legal_list_id" integer,
                              "orgs_indiv_list_id" integer,
                              "property_classifier" varchar,
                              "price_proposal_submission_form" auctions_price_proposal_submission_form
);

CREATE TABLE "AuctionsPlatformList" (
                                      "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                      "deleted_at" timestamp,
                                      "auct_platforms_sro_id" integer,
                                      "disqualified_persons" jsonb
);

CREATE TABLE "DeptorsLegalList" (
                                  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                  "deleted_at" timestamp,
                                  "region_id" integer,
                                  "category" legal_entities_debtors_status,
                                  "name" varchar,
                                  "address" text,
                                  "code_inn" varchar,
                                  "code_ogrn" varchar,
                                  "code_okpo" varchar
);

CREATE TABLE "DeptorsIndivList" (
                                  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                  "deleted_at" timestamp,
                                  "region_id" integer,
                                  "category" individuals_debtors_status,
                                  "name_first" varchar,
                                  "name_second" varchar,
                                  "name_family" varchar,
                                  "address" text,
                                  "code_inn" varchar,
                                  "code_ogrnip" varchar,
                                  "code_snils" varchar
);

CREATE TABLE "AdminsList" (
                            "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                            "login" varchar UNIQUE NOT NULL,
                            "passw_hash" varchar
);

CREATE TABLE "FinancesActions" (
                                 "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                 "deleted_at" timestamp,
                                 "type" finances_actions_type,
                                 "desc" finances_actions_description
);

CREATE TABLE "FinancesBills" (
                               "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                               "deleted_at" timestamp,
                               "status" finances_bills_status
);

CREATE TABLE "CourtsCases" (
                             "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                             "created_at" timestamp,
                             "deleted_at" timestamp,
                             "status" courts_cases_status,
                             "deptor_status" courts_cases_deptor_status,
                             "procedure_termination_reason" courts_cases_procedure_termn_reason,
                             "finances_bills_status" finances_bills_status,
                             "сlaim_number_n_judge_code" varchar
);

CREATE INDEX ON "DictRegion" ("okato_oktmo_code");

CREATE INDEX ON "DictRegion" ("title");

CREATE INDEX ON "DictSro" ("code");

CREATE INDEX ON "DictSro" ("register_number");

CREATE INDEX ON "DictArbitrationCourts" ("title");

CREATE INDEX ON "DictOkopf" ("code");

CREATE INDEX ON "DictOkopf" ("title");

CREATE INDEX ON "DictOkopf" ("parent_id");

CREATE INDEX ON "DictMessageTypes" ("code");

CREATE INDEX ON "DictMessageTypes" ("title");

CREATE INDEX ON "DictMessageTypes" ("parent_id");

CREATE INDEX ON "UsersList" ("login");

CREATE INDEX ON "UsersRoles" ("code");

CREATE INDEX ON "UsersRolesPivot" ("user_id");

CREATE INDEX ON "UsersRolesPivot" ("user_role_id");

CREATE INDEX ON "UsersContacts" ("user_id");

CREATE INDEX ON "UsersContacts" ("email");

CREATE INDEX ON "ArbManagersList" ("user_id");

CREATE INDEX ON "ArbManagersList" ("name_first");

CREATE INDEX ON "ArbManagersList" ("name_second");

CREATE INDEX ON "ArbManagersList" ("name_family");

CREATE INDEX ON "ArbManagersList" ("registry_number");

CREATE INDEX ON "ArbManagersList" ("sro_id");

CREATE INDEX ON "MessagesList" ("updated_at");

CREATE INDEX ON "MessagesList" ("number");

CREATE INDEX ON "MessagesList" ("message_type_id");

CREATE INDEX ON "MessagesList" ("status");

CREATE INDEX ON "MessagesList" ("publisher_id");

CREATE INDEX ON "MessagesPublisherList" ("type");

CREATE INDEX ON "MessagesPublisherList" ("arb_manager_id");

CREATE INDEX ON "MessagesPublisherList" ("auction_org_legal_id");

CREATE INDEX ON "MessagesPublisherList" ("auction_org_indiv_id");

CREATE INDEX ON "MessagesPublisherList" ("sro_id");

CREATE INDEX ON "AuctionOrgsLegalList" ("name");

CREATE INDEX ON "AuctionOrgsLegalList" ("address");

CREATE INDEX ON "AuctionOrgsIndivList" ("name_first");

CREATE INDEX ON "AuctionOrgsIndivList" ("name_second");

CREATE INDEX ON "AuctionOrgsIndivList" ("name_family");

CREATE INDEX ON "AuctionOrgsIndivList" ("address");

CREATE INDEX ON "DeptorsLegalList" ("region_id");

CREATE INDEX ON "DeptorsLegalList" ("category");

CREATE INDEX ON "DeptorsLegalList" ("name");

CREATE INDEX ON "DeptorsLegalList" ("address");

CREATE INDEX ON "DeptorsLegalList" ("code_inn");

CREATE INDEX ON "DeptorsLegalList" ("code_ogrn");

CREATE INDEX ON "DeptorsLegalList" ("code_okpo");

CREATE INDEX ON "DeptorsIndivList" ("region_id");

CREATE INDEX ON "DeptorsIndivList" ("category");

CREATE INDEX ON "DeptorsIndivList" ("name_first");

CREATE INDEX ON "DeptorsIndivList" ("name_second");

CREATE INDEX ON "DeptorsIndivList" ("name_family");

CREATE INDEX ON "DeptorsIndivList" ("address");

CREATE INDEX ON "DeptorsIndivList" ("code_inn");

CREATE INDEX ON "DeptorsIndivList" ("code_ogrnip");

CREATE INDEX ON "DeptorsIndivList" ("code_snils");

CREATE INDEX ON "AdminsList" ("login");

ALTER TABLE "DictOkopf" ADD FOREIGN KEY ("parent_id") REFERENCES "DictOkopf" ("id");

ALTER TABLE "DictMessageTypes" ADD FOREIGN KEY ("parent_id") REFERENCES "DictMessageTypes" ("id");

ALTER TABLE "UsersRolesPivot" ADD FOREIGN KEY ("user_id") REFERENCES "UsersList" ("id");

ALTER TABLE "UsersRolesPivot" ADD FOREIGN KEY ("user_role_id") REFERENCES "UsersRoles" ("id");

ALTER TABLE "UsersContacts" ADD FOREIGN KEY ("user_id") REFERENCES "UsersList" ("id");

ALTER TABLE "ArbManagersList" ADD FOREIGN KEY ("user_id") REFERENCES "UsersList" ("id");

ALTER TABLE "ArbManagersList" ADD FOREIGN KEY ("sro_id") REFERENCES "DictSro" ("id");

ALTER TABLE "ArbManagersActions" ADD FOREIGN KEY ("arb_manager_id") REFERENCES "ArbManagersList" ("id");

ALTER TABLE "ArbManagersReports" ADD FOREIGN KEY ("arb_manager_id") REFERENCES "ArbManagersList" ("id");

ALTER TABLE "MessagesList" ADD FOREIGN KEY ("message_type_id") REFERENCES "DictMessageTypes" ("id");

ALTER TABLE "MessagesList" ADD FOREIGN KEY ("deptor_legal_id") REFERENCES "DeptorsLegalList" ("id");

ALTER TABLE "MessagesList" ADD FOREIGN KEY ("deptor_indiv_id") REFERENCES "DeptorsIndivList" ("id");

ALTER TABLE "MessagesList" ADD FOREIGN KEY ("publisher_id") REFERENCES "MessagesPublisherList" ("id");

ALTER TABLE "MessagesPublisherList" ADD FOREIGN KEY ("arb_manager_id") REFERENCES "ArbManagersList" ("id");

ALTER TABLE "MessagesPublisherList" ADD FOREIGN KEY ("auction_org_legal_id") REFERENCES "AuctionOrgsLegalList" ("id");

ALTER TABLE "MessagesPublisherList" ADD FOREIGN KEY ("auction_org_indiv_id") REFERENCES "AuctionOrgsIndivList" ("id");

ALTER TABLE "MessagesPublisherList" ADD FOREIGN KEY ("sro_id") REFERENCES "DictSro" ("id");

ALTER TABLE "AuctionsList" ADD FOREIGN KEY ("orgs_legal_list_id") REFERENCES "AuctionOrgsLegalList" ("id");

ALTER TABLE "AuctionsList" ADD FOREIGN KEY ("orgs_indiv_list_id") REFERENCES "AuctionOrgsIndivList" ("id");

ALTER TABLE "AuctionsList" ADD FOREIGN KEY ("platform_id") REFERENCES "AuctionsPlatformList" ("id");

ALTER TABLE "AuctionsPlatformList" ADD FOREIGN KEY ("auct_platforms_sro_id") REFERENCES "DictAuctPlatformsSro" ("id");

ALTER TABLE "DeptorsLegalList" ADD FOREIGN KEY ("region_id") REFERENCES "DictRegion" ("id");

ALTER TABLE "DeptorsIndivList" ADD FOREIGN KEY ("region_id") REFERENCES "DictRegion" ("id");
