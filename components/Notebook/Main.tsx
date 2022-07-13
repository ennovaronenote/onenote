import { useEffect, useState } from "react";
import useCookies from "../../hooks/useCookies";
import useTableData from "../../hooks/useTableData";
import TableContainer from "../Table/Container";

/**
 * @group Components
 */
function NotebookMain({ notebooks }: { notebooks: any }) {
  const { parseData } = useTableData();
  const { activeCookie, getCookieByKey, setData } = useCookies("notebook");
  const [currentSelection, setCurrentSelection] = useState<JSX.Element>();

  useEffect(() => {
    if (!activeCookie.displayName) return;

    setCurrentSelection(
      <p className="text-center italic text-sm pb-5">
        Current: {activeCookie.displayName}
      </p>
    );
  }, [activeCookie]);

  return (
    <div
      className="container mx-auto"
      onClick={() => setData(getCookieByKey("notebook"))}
    >
      <p className="text-center italic text-sm pb-1">
        Hint: if you click a row, the app will remember your selection!
      </p>
      {currentSelection}

      <TableContainer
        headers={["Notebook Title", "OneNote Link", "Creation Date"]}
        rows={parseData(notebooks, "notebook")}
      />
    </div>
  );
}

export default NotebookMain;
