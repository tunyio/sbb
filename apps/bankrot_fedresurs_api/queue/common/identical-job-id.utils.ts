const getIdentJobIdFromPgId = (jobIdPrefix: string, docPgId: number) =>
  jobIdPrefix + docPgId;

const getPgIdFromIdentJobId = (jobIdPrefix: string, jobId: string) =>
  Number(jobId.substring(jobIdPrefix.length));

/////////////////////////////////////////////////////////////////////////

const indexMessagesListDocJobIdPrefix =
  'INDEX_MESSAGES_LIST_SEARCH_DOC_BY_PG_ID_';

export const getIndexMessagesListDocJobId = (messagesListPgId: number) =>
  getIdentJobIdFromPgId(indexMessagesListDocJobIdPrefix, messagesListPgId);

export const getIndexMessagesListDocPgId = (jobId: string) =>
  getPgIdFromIdentJobId(indexMessagesListDocJobIdPrefix, jobId);

const delFromIndexMessagesListDocJobIdPrefix =
  'REMOVE_FROM_INDEX_MESSAGES_LIST_DOC_BY_PG_ID_';

export const getDelFromIndexMessagesListDocJobId = (messagesListPgId: number) =>
  getIdentJobIdFromPgId(delFromIndexMessagesListDocJobIdPrefix, messagesListPgId);

export const getDelFromIndexMessagesListDocPgId = (jobId: string) =>
  getPgIdFromIdentJobId(delFromIndexMessagesListDocJobIdPrefix, jobId);

const indexDeptorsIndivListDocJobIdPrefix =
  'INDEX_DEPTORS_INDIV_LIST_SEARCH_DOC_BY_PG_ID_';

export const getIndexDeptorsIndivListDocJobId = (deptorsIndivListPgId: number) =>
  getIdentJobIdFromPgId(
    indexDeptorsIndivListDocJobIdPrefix,
    deptorsIndivListPgId
  );

export const getIndexDeptorsIndivListDocPgId = (jobId: string) =>
  getPgIdFromIdentJobId(indexDeptorsIndivListDocJobIdPrefix, jobId);

const delFromIndexDeptorsIndivListDocJobIdPrefix =
  'REMOVE_FROM_INDEX_DEPTORS_INDIV_LIST_DOC_BY_PG_ID_';

export const getDelFromIndexDeptorsIndivListDocJobId = (
  deptorsIndivListPgId: number
) =>
  getIdentJobIdFromPgId(
    delFromIndexDeptorsIndivListDocJobIdPrefix,
    deptorsIndivListPgId
  );

export const getDelFromIndexDeptorsIndivListDocPgId = (jobId: string) =>
  getPgIdFromIdentJobId(delFromIndexDeptorsIndivListDocJobIdPrefix, jobId);

const indexDeptorsLegalListDocJobIdPrefix =
  'INDEX_DEPTORS_LEGAL_LIST_SEARCH_DOC_BY_PG_ID_';

export const getIndexDeptorsLegalListDocJobId = (deptorsLegalListPgId: number) =>
  getIdentJobIdFromPgId(
    indexDeptorsLegalListDocJobIdPrefix,
    deptorsLegalListPgId
  );

export const getIndexDeptorsLegalListDocPgId = (jobId: string) =>
  getPgIdFromIdentJobId(indexDeptorsLegalListDocJobIdPrefix, jobId);

const delFromIndexDeptorsLegalListDocJobIdPrefix =
  'REMOVE_FROM_INDEX_DEPTORS_LEGAL_LIST_DOC_BY_PG_ID_';

export const getDelFromIndexDeptorsLegalListDocJobId = (
  deptorsLegalListPgId: number
) =>
  getIdentJobIdFromPgId(
    delFromIndexDeptorsLegalListDocJobIdPrefix,
    deptorsLegalListPgId
  );

export const getDelFromIndexDeptorsLegalListDocPgId = (jobId: string) =>
  getPgIdFromIdentJobId(delFromIndexDeptorsLegalListDocJobIdPrefix, jobId);
