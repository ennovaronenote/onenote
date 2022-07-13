import TableRows from "./Rows";

type TableBodyProps = {
  rows: any[];
};

function TableBody({ rows }: TableBodyProps) {
  if (rows.length === 0) return <></>;
  return <TableRows rows={rows} />;
}

export type { TableBodyProps };
export default TableBody;
