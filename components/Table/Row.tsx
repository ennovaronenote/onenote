import useCookies from "../../hooks/useCookies";
import TableCell from "./Cell";

type TableRowProps = {
  row: any;
  customDataType?: string;
};

/**
 * @group Components
 */
function TableRow(props: TableRowProps) {
  const { row, customDataType = props.row.dataType } = props;
  const { setCookieData } = useCookies(customDataType);

  return (
    <div
      className="table-row odd:bg-blue-500 odd:text-white even:text-blue-500"
      onClick={() => setCookieData(row)}
    >
      {Object.entries(row).map((cellData: any) => {
        const cellKey = `${row.id}_${cellData}`;
        const cellType = cellData[0] === "link" ? "link" : "string";
        if (cellData[0] === "id" || cellData[0] === "dataType") return;

        return (
          <TableCell
            key={cellKey}
            text={cellData[1]}
            cellType={cellType}
          ></TableCell>
        );
      })}
    </div>
  );
}

export type { TableRowProps };
export default TableRow;
