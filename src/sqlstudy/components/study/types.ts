import type { ContentBlock } from "../../content/types";

export type {
  CalloutTone,
  ContentBlock,
  StudyContent,
  StudyContentMap,
  StudySection,
} from "../../content/types";

export type TextBlock = Extract<ContentBlock, { type: "text" }>;
export type ListBlock = Extract<ContentBlock, { type: "list" }>;
export type CodeBlock = Extract<ContentBlock, { type: "code" }>;
export type TableBlock = Extract<ContentBlock, { type: "table" }>;
export type CalloutBlock = Extract<ContentBlock, { type: "callout" }>;
