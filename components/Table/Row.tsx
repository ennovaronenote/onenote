import useCookies from "../../hooks/useCookies";
import TableCell from "./Cell";

/**
 * @group Components
 */
function TableRow({ row }: { row: any }) {
  const { setData } = useCookies(row.dataType);

  return (
    <div
      className="table-row odd:bg-blue-500 odd:text-white even:text-blue-500"
      onClick={() => setData(row)}
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

export default TableRow;
