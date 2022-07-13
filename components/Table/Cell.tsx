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
  const [linkContent, setLinkContent] = useState<JSX.Element | undefined>(
    undefined
  );

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

  return (
    <div className="table-cell m-2 text-center py-3">
      {typeof text === "object" ? linkContent : cellContent}
    </div>
  );
}

export type { TableCellProps };
export default TableCell;
