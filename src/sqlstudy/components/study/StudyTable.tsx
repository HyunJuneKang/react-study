import type { TableBlock } from "./types";

type StudyTableProps = {
  block: TableBlock;
};

export default function StudyTable({ block }: StudyTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          {block.caption && (
            <caption className="border-b border-slate-200 bg-slate-50 px-5 py-3 text-left text-sm font-bold text-slate-700">
              {block.caption}
            </caption>
          )}

          <thead className="bg-slate-900 text-slate-100">
            <tr>
              {block.headers.map((header, index) => (
                <th
                  key={`${header}-${index}`}
                  scope="col"
                  className="whitespace-nowrap border-r border-slate-700 px-4 py-3 font-bold last:border-r-0"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {block.rows.map((row, rowIndex) => (
              <tr
                key={`row-${rowIndex}`}
                className="odd:bg-white even:bg-slate-50/70 hover:bg-blue-50/70"
              >
                {block.headers.map((_, columnIndex) => (
                  <td
                    key={`cell-${rowIndex}-${columnIndex}`}
                    className="border-r border-slate-200 px-4 py-3 align-top leading-6 text-slate-700 last:border-r-0"
                  >
                    {row[columnIndex] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
