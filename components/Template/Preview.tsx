import { useEffect, useState } from "react";
import TableContainer from "../Table/Container";

type TemplatePreviewProps = {
  headers: string[];
};

/**
 * @category Components
 */
function TemplatePreview(props: TemplatePreviewProps) {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    if (props.headers.length === 0) return;
    if (props.headers.length === rows.length) return;
    props.headers.map((header: string) => {
      if (!header) return;
      const newRowItem = [...rows];
      newRowItem.push(`Sample data for ${header}`);

      setRows(newRowItem);
    });
  }, [props.headers]);

  if (props.headers.length === 0 || rows.length === 0) return <></>;

  return (
    <div className="container mx-auto text-center">
      <div className="prose-2xl mx-auto text-neutral-700 pt-5 pb-3">
        Preview of Template
      </div>
      <TableContainer headers={props.headers} rows={[rows]} />
    </div>
  );
}

export type { TemplatePreviewProps };
export default TemplatePreview;
