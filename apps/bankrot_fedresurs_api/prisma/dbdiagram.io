// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Enum message_status {
  opublikovano
  podpisano
  nepodpisano
}

Enum applicant_type {
  konkursnii_kreditor
  upolnomochennii_organ
  rabotnik_dolzhnika_ili_predstavitel_rabotnikov_dolzhnika
  gosudarstvennii_kontrolnii_organ
  dolzhnik
}

Enum individuals_debtors_status {
  individualnii_predprinimatel
  krestyanskoe_fermerskoe_khozyaistvo
  otsutstvuyushchii_dolzhnik
  fizicheskoe_litso
}

Enum legal_entities_debtors_status {
  gradoobrazuyushchaya_organizatsiya
  zastroishchik
  inaya_finansovaya_organizatsiya
  kreditnaya_organizatsiya
  likvidiruemii_dolzhnik
  negosudarstvennii_pensionnii_fond
  obichnaya_organizatsiya
  otsutstvuyushchii_dolzhnik
  selskokhozyaistvennaya_organizatsiya
  strategicheskoe_predpriyatie_i_organizatsiya
  subekt_yestestvennikh_monopolii
  strakhovaya_organizatsiya
}

Enum message_publisher {
  arbitrazhnii_upravlyayushchii
  organizator_torgov_yuridicheskoe_litso
  organizator_torgov_fizicheskoe_litso
  sro_au
  yuridicheskoe_litso
  fizicheskoe_litso
  publikator_fns
  prochie_gos_korporatsiya_agentstvo_po_strakhovaniyu_vkladov
  prochie_tsentralnii_bank_rf
  prochie_federalnaya_sluzhba_sudebnikh_pristavov
  prochie_federalnaya_nalogovaya_sluzhba
  prochie_operator_efrsb
}

Enum procedure_ending_reason {
  proizvodstvo_po_delu_zaversheno
  proizvodstvo_po_delu_prekrashcheno
  otkaz_v_priznanii_dolzhnika_bankrotom
  inoe
}

Enum user_role {
  arbitrazhnii_upravlyayushchii
}

Enum finances_actions_type {
  prihod
  rashod
}

Enum finances_actions_description {
  popolnenie_litsevogo_scheta
  publikatsiya_soobsheniya
}

Enum finances_bills_status {
  ne_oplachen
  oplachen
}

Enum arb_manager_actions_type {
  sobitie_o_chlenstve_v_sro
}

Enum arb_manager_actions_description {
  vklyuchenie_v_sro
  isklyuchenie_iz_sro
}

Enum arb_manager_report_type {
  finalnii_otchet
  promezhutochnii_ochet
}

Enum arb_manager_reports_procedure_type {
  deistviya_v_otnoshenii_dolzhnika
}

Enum courts_cases_status {
  aktivno
  zaversheno_prekrashcheno
}

Enum courts_cases_deptor_status {
  deistvuyushchii
  isklyuchen_iz_egryul
}

Enum courts_cases_procedure_termn_reason {
  prekratit
}

Enum auctions_type {
  publichnoe_predlozhenie
  auktsion
}

Enum auctions_status {
  nachati
}

Enum auctions_price_proposal_submission_form {
  otkritaya
  zakritaya
}

Enum sro_document_type {
  svedeniya_o_filialakh_i_predstavitelstvakh
  uchreditelnie_dokumenti
}

Enum fns_actions_type {
  dobavlenie_k_spisku
  neuchet
  vibor_dlya_zayavleniya
}

TableGroup Dictionaries {
  DictRegion
  DictAuctPlatforms
  DictAuctPlatformsSro
  DictSro
  DictArbitrationCourts
  DictOkopf
  DictMessageTypes
}

Table DictRegion {
  id integer [pk, increment]
  deleted_at timestamp
  okato_oktmo_code varchar [unique]
  title varchar [not null]

  indexes {
    okato_oktmo_code
    title
  }
}

Table DictAuctPlatforms {
  id integer [pk, increment]
  deleted_at timestamp
  title varchar [not null]
}

Table DictAuctPlatformsSro {
  id integer [pk, increment]
  deleted_at timestamp
  code varchar [unique, not null]
  title varchar [not null]
  register_number varchar
}

Table DictSro {
  id integer [pk, increment]
  deleted_at timestamp
  code varchar [unique, not null]
  title varchar [not null]
  register_number varchar
  document_type sro_document_type

  indexes {
    code
    register_number
  }
}

Table DictArbitrationCourts {
  id integer [pk, increment]
  deleted_at timestamp
  title varchar [not null]

  indexes {
    title
  }
}

Table DictOkopf {
  id integer [pk, increment]
  deleted_at timestamp
  code integer [unique, not null]
  title varchar [not null]
  canceled bool [default: false]
  parent_id integer

  indexes {
    code
    title
    parent_id
  }
}

Ref: "DictOkopf"."parent_id" > "DictOkopf"."id"

Table DictMessageTypes {
  id integer [pk, increment]
  deleted_at timestamp
  code varchar [unique, not null]
  title varchar [not null]
  parent_id integer

  indexes {
    code
    title
    parent_id
  }
}

Ref: "DictMessageTypes"."parent_id" > "DictMessageTypes"."id"

TableGroup Users {
  UsersList
  UsersRoles
  UsersRolesPivot
  UsersContacts
}

Table UsersList {
  id integer [pk, increment]
  deleted_at timestamp
  blocked bool
  blocked_reason text
  login varchar [unique, not null]
  passw_hash varchar

  indexes {
    login
  }
}

Table UsersRoles {
  id integer [pk, increment]
  deleted_at timestamp
  code user_role [unique, not null]

  indexes {
    code
  }
}

Table UsersRolesPivot {
  id integer [pk, increment]
  user_id integer [not null]
  user_role_id integer [not null]
  created_at timestamp [default: `now()`]

  indexes {
    user_id
    user_role_id
  }
}

Ref: "UsersList"."id" < "UsersRolesPivot"."user_id"

Ref: "UsersRoles"."id" < "UsersRolesPivot"."user_role_id"

Table UsersContacts {
  id integer [pk, increment]
  deleted_at timestamp
  user_id integer [not null]
  email varchar [unique]
  email_passw_reset_token varchar

  indexes {
    user_id
    email
  }
}

Ref: "UsersList"."id" < "UsersContacts"."user_id"

TableGroup ArbitrationManagers {
  ArbManagersList
  ArbManagersActions
  ArbManagersReports
}

Table ArbManagersList {
  id integer [pk, increment]
  deleted_at timestamp
  user_id integer [unique, not null]
  name_first varchar
  name_second varchar
  name_family varchar
  name_full varchar
  registry_number varchar
  sro_id integer

  indexes {
    user_id
    name_first
    name_second
    name_family
    registry_number
    sro_id
  }
}

Ref: "ArbManagersList"."user_id" > "UsersList"."id"

Ref: "ArbManagersList"."sro_id" > "DictSro"."id"

Table ArbManagersActions {
  id integer [pk, increment]
  deleted_at timestamp
  arb_manager_id integer [unique, not null]
  type arb_manager_actions_type
  desc arb_manager_actions_description
}

Ref: "ArbManagersActions"."arb_manager_id" > "ArbManagersList"."id"

Table ArbManagersReports {
  id integer [pk, increment]
  deleted_at timestamp
  arb_manager_id integer [unique, not null]
  type arb_manager_report_type
  procedure_type arb_manager_reports_procedure_type
}

Ref: "ArbManagersReports"."arb_manager_id" > "ArbManagersList"."id"

TableGroup Messages {
  MessagesList
  MessagesPublisherList
}

Table MessagesList {
  id integer [pk, increment]
  updated_at timestamp [default: `now()`]
  deleted_at timestamp
  number integer [increment]
  message_type_id integer
  status message_status
  publication_date timestamp [not null]
  publisher_id integer [not null]
  blocked bool
  blocked_reason text
  deptor_legal_id integer
  deptor_indiv_id integer

  indexes {
    updated_at
    number
    message_type_id
    status
    publisher_id
  }
}

Ref: "MessagesList"."message_type_id" > "DictMessageTypes"."id"

Ref: "MessagesList"."deptor_legal_id" > "DeptorsLegalList"."id"

Ref: "MessagesList"."deptor_indiv_id" > "DeptorsIndivList"."id"

Table MessagesPublisherList {
  id integer [pk, increment]
  deleted_at timestamp
  type message_publisher [not null]
  arb_manager_id integer
  auction_org_legal_id integer
  auction_org_indiv_id integer
  sro_id integer

  indexes {
    type
    arb_manager_id
    auction_org_legal_id
    auction_org_indiv_id
    sro_id
  }
}

Ref: "MessagesPublisherList"."id" < "MessagesList"."publisher_id"

Ref: "MessagesPublisherList"."arb_manager_id" > "ArbManagersList"."id"

Ref: "MessagesPublisherList"."auction_org_legal_id" > "AuctionOrgsLegalList"."id"

Ref: "MessagesPublisherList"."auction_org_indiv_id" > "AuctionOrgsIndivList"."id"

Ref: "MessagesPublisherList"."sro_id" > "DictSro"."id"

TableGroup AuctionOrganizators {
  AuctionOrgsLegalList
  AuctionOrgsIndivList
}

Table AuctionOrgsLegalList {
  id integer [pk, increment]
  deleted_at timestamp
  name varchar
  address text

  indexes {
    name
    address
  }
}

Table AuctionOrgsIndivList {
  id integer [pk, increment]
  deleted_at timestamp
  name_first varchar
  name_second varchar
  name_family varchar
  name_full varchar
  address text

  indexes {
    name_first
    name_second
    name_family
    address
  }
}

TableGroup Auctions {
  AuctionsList
  AuctionsPlatformList
}

Table AuctionsList {
  id integer [pk, increment]
  deleted_at timestamp
  type auctions_type
  status auctions_status
  platform_id integer
  orgs_legal_list_id integer
  orgs_indiv_list_id integer
  property_classifier varchar
  price_proposal_submission_form auctions_price_proposal_submission_form
}

Ref: "AuctionsList"."orgs_legal_list_id" > "AuctionOrgsLegalList"."id"

Ref: "AuctionsList"."orgs_indiv_list_id" > "AuctionOrgsIndivList"."id"

Ref: "AuctionsList"."platform_id" > "AuctionsPlatformList"."id"

Table AuctionsPlatformList {
  id integer [pk, increment]
  deleted_at timestamp
  auct_platforms_sro_id integer
  disqualified_persons jsonb
}

Ref: "AuctionsPlatformList"."auct_platforms_sro_id" > "DictAuctPlatformsSro"."id"

TableGroup Deptors {
  DeptorsLegalList
  DeptorsIndivList
}

Table DeptorsLegalList {
  id integer [pk, increment]
  deleted_at timestamp
  region_id integer
  category legal_entities_debtors_status
  name varchar
  address text
  code_inn varchar
  code_ogrn varchar
  code_okpo varchar

  indexes {
    region_id
    category
    name
    address
    code_inn
    code_ogrn
    code_okpo
  }
}

Ref: "DeptorsLegalList"."region_id" > "DictRegion"."id"

Table DeptorsIndivList {
  id integer [pk, increment]
  deleted_at timestamp
  region_id integer
  category individuals_debtors_status
  name_first varchar
  name_second varchar
  name_family varchar
  address text
  code_inn varchar
  code_ogrnip varchar
  code_snils varchar

  indexes {
    region_id
    category
    name_first
    name_second
    name_family
    address
    code_inn
    code_ogrnip
    code_snils
  }
}

Ref: "DeptorsIndivList"."region_id" > "DictRegion"."id"

TableGroup Admins {
  AdminsList
}

Table AdminsList {
  id integer [pk, increment]
  login varchar [unique, not null]
  passw_hash varchar

  indexes {
    login
  }
}

TableGroup Finances {
  FinancesActions
  FinancesBills
}

Table FinancesActions {
  id integer [pk, increment]
  deleted_at timestamp
  type finances_actions_type
  desc finances_actions_description
}

Table FinancesBills {
  id integer [pk, increment]
  deleted_at timestamp
  status finances_bills_status
}

TableGroup Courts {
  CourtsCases
}

Table CourtsCases {
  id integer [pk, increment]
  created_at timestamp
  deleted_at timestamp
  status courts_cases_status
  deptor_status courts_cases_deptor_status
  procedure_termination_reason courts_cases_procedure_termn_reason
  finances_bills_status finances_bills_status
  сlaim_number_n_judge_code varchar
}
