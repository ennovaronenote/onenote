import TableBody from "./Body";
import TableHeaders from "./Headers";

type TableContainerProps = {
  headers: string[];
  rows: any[];
  customDataType?: string;
};

/**
 * Reusable table container so that rendering data is easier.
 * @group Components
 */
function TableContainer(props: TableContainerProps) {
  const { headers, rows, customDataType } = props;
  return (
    <div className="table w-3/4 mx-auto">
      <TableHeaders headers={headers} />
      <TableBody rows={rows} customDataType={customDataType} />
    </div>
  );
}

export type { TableContainerProps };
export default TableContainer;
