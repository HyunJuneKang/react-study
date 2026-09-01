export type CalloutTone = "info" | "tip" | "warning" | "danger";
export type ContentTone = CalloutTone;

export type ContentBlock =
  | { type: "text"; paragraphs: string[] }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; code: string; language?: string; title?: string }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
      caption?: string;
    }
  | {
      type: "callout";
      title?: string;
      content: string;
      tone?: ContentTone;
    };

export type StudySection = {
  id?: string;
  title: string;
  description?: string;
  blocks: ContentBlock[];
};

export type StudyContent = {
  id: string;
  category: string;
  title: string;
  summary: string;
  tags?: string[];
  sections: StudySection[];
};

export type StudyContentMap = Record<string, StudyContent>;
