import { useEffect, useState } from "react";
import useCookies from "../../../hooks/useCookies";
import TableContainer from "../../Table/Container";

export type TemplatePreviewTableProps = {
  activeCookie: any;
};

function TemplatePreviewTable(props: TemplatePreviewTableProps) {
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[]>([]);

  useEffect(() => {
    const headers: any[] = props.activeCookie.headers || [];
    const rows: any[] = props.activeCookie.rows || [];

    setHeaders(headers);
    setRows(rows);
  }, [props.activeCookie]);

  return (
    <>
      <TableContainer
        headers={headers}
        rows={rows}
        customDataType="previewRows"
      />
    </>
  );
}

export type { TemplatePreviewTable };
export default TemplatePreviewTable;
