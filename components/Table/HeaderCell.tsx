type TableHeaderCellProps = {
  header: string;
};

/**
 * @group Components
 */
function TableHeaderCell({ header }: TableHeaderCellProps) {
  return (
    <div className="table-cell border-b border-violet-500 text-center py-2 text-2xl">
      {header}
    </div>
  );
}

export type { TableHeaderCellProps };
export default TableHeaderCell;
