import TableRow from "./Row";

/**
 * @group Components
 */
function TableRows({ rows }: { rows: any }) {
  return rows.map((row: any, idx: number) => <TableRow key={idx} row={row} />);
}

export default TableRows;
