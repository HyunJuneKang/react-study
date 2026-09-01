import { databaseContents } from "./database";
import { modelingContents } from "./modeling";
import { operationContents } from "./operations";
import { performanceContents } from "./performance";
import { securityContents } from "./security";
import { sqlContents } from "./sql";
import { transactionContents } from "./transactions";
import type { StudyContentMap } from "./types";

export type {
  CalloutTone,
  ContentBlock,
  ContentTone,
  StudyContent,
  StudyContentMap,
  StudySection,
} from "./types";

export {
  databaseContents,
  modelingContents,
  operationContents,
  performanceContents,
  securityContents,
  sqlContents,
  transactionContents,
};

export const studyContentById = {
  ...databaseContents,
  ...sqlContents,
  ...modelingContents,
  ...performanceContents,
  ...transactionContents,
  ...securityContents,
  ...operationContents,
} satisfies StudyContentMap;

export type StudyContentId = keyof typeof studyContentById;

export const studyContents = Object.values(studyContentById);

export function getStudyContent(id: string) {
  return studyContentById[id as StudyContentId];
}
