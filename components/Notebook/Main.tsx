import useTableData from "../../hooks/useTableData";
import TableContainer from "../Table/Container";

/**
 * @group Components
 */
function NotebookMain({ notebooks }: { notebooks: any }) {
  const { parseData } = useTableData();

  return (
    <div className="container mx-auto">
      <TableContainer
        headers={["Notebook Title", "OneNote Link", "Creation Date"]}
        rows={parseData(notebooks, "notebook")}
      />
    </div>
  );
}

export default NotebookMain;
