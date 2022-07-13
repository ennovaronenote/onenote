import Link from "next/link";
import { useEffect, useState } from "react";

type TableCellProps = {
  text: string | any;
  cellType: string;
};

/**
 * @group Components
 */
function TableCell({ text, cellType }: TableCellProps) {
  const [cellContent, setCellContent] = useState<string>(text);
  const [linkContent, setLinkContent] = useState<JSX.Element>();

  useEffect(() => {
    if (cellType === "link") {
      setLinkContent(
        <Link href={text.href}>
          <a>{text.displayText}</a>
        </Link>
      );
      setCellContent(text.displayText);
    }
  }, [cellType, text]);

  if (typeof cellContent !== "string") return <></>;

  return (
    <div className="table-cell border-solid border-b-2 border-y-violet-400 m-2 text-center py-3 text-blue-500">
      {linkContent ? linkContent : cellContent}
    </div>
  );
}

export type { TableCellProps };
export default TableCell;
