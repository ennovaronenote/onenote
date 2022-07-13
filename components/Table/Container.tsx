import TableBody from "./Body";
import TableHeaders from "./Headers";

type TableContainerProps = {
  headers: string[];
  rows: any[];
};

/**
 * Reusable table container so that rendering data is easier.
 * @group Components
 */
function TableContainer({ headers, rows }: TableContainerProps) {
  return (
    <div className="table w-3/4 mx-auto">
      <TableHeaders headers={headers} />
      <TableBody rows={rows} />
    </div>
  );
}

export type { TableContainerProps };
export default TableContainer;
