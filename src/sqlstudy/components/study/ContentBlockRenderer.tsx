import StudyCallout from "./StudyCallout";
import StudyCodeBlock from "./StudyCodeBlock";
import StudyTable from "./StudyTable";
import type { ContentBlock } from "./types";

type ContentBlockRendererProps = {
  block: ContentBlock;
};

export default function ContentBlockRenderer({
  block,
}: ContentBlockRendererProps) {
  switch (block.type) {
    case "text":
      return (
        <div className="space-y-3 text-[0.975rem] leading-7 text-slate-700">
          {block.paragraphs.map((paragraph, index) => (
            <p key={`${paragraph.slice(0, 24)}-${index}`}>{paragraph}</p>
          ))}
        </div>
      );

    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";

      return (
        <ListTag
          className={`space-y-2 pl-6 text-[0.975rem] leading-7 text-slate-700 marker:font-bold marker:text-blue-600 ${
            block.ordered ? "list-decimal" : "list-disc"
          }`}
        >
          {block.items.map((item, index) => (
            <li key={`${item.slice(0, 24)}-${index}`} className="pl-1">
              {item}
            </li>
          ))}
        </ListTag>
      );
    }

    case "code":
      return <StudyCodeBlock block={block} />;

    case "table":
      return <StudyTable block={block} />;

    case "callout":
      return <StudyCallout block={block} />;
  }
}
