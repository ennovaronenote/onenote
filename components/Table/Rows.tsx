import TableRow from "./Row";

type TableRowsProps = {
  rows: any;
  customDataType?: string;
};

/**
 * @group Components
 */
function TableRows(props: TableRowsProps) {
  const { rows, customDataType } = props;
  return rows.map((row: any, idx: number) => (
    <TableRow key={idx} row={row} customDataType={customDataType} />
  ));
}

export default TableRows;
