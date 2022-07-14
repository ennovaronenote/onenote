import TableHeaderCell from "./HeaderCell";

type TableHeadersProps = {
  headers: string[];
};

/**
 * @group Components
 */
function TableHeaders({ headers }: TableHeadersProps) {
  return (
    <div className="table-header-group bg-blue-500 text-white">
      <div className="table-row">
        {headers.map((header: string, index: number) => (
          <TableHeaderCell key={index} header={header} />
        ))}
      </div>
    </div>
  );
}

export type { TableHeadersProps };
export default TableHeaders;
