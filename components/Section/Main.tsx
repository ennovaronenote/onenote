import { useEffect, useState } from "react";
import useCookies from "../../hooks/useCookies";
import useTableData from "../../hooks/useTableData";
import TableContainer from "../Table/Container";

/**
 * @group Components
 * @returns
 */
function SectionMain({
  sections,
  notebookTitle,
}: {
  sections: any;
  notebookTitle: string;
}) {
  const { parseData } = useTableData();
  const { activeCookie, getCookieByKey, setData } = useCookies("section");
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
      onClick={() => setData(getCookieByKey("section"))}
    >
      {/* <div className="prose-2xl text-neutral-700 mx-auto text-center py-5">
        {notebookTitle}
      </div> */}
      <p className="text-center italic text-sm pb-1">
        Hint: if you click a row, the app will remember your selection!
      </p>
      {currentSelection}

      <TableContainer
        headers={["Section Name", "OneNote Link", "Creation Date"]}
        rows={parseData(sections, "section")}
      />
    </div>
  );
}

export default SectionMain;
