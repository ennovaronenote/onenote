import TableRows from "./Rows";

type TableBodyProps = {
  rows: any[];
  customDataType?: string;
};

function TableBody(props: TableBodyProps) {
  const { rows, customDataType } = props;
  if (rows.length === 0) return <></>;
  return <TableRows rows={rows} customDataType={customDataType} />;
}

export type { TableBodyProps };
export default TableBody;
