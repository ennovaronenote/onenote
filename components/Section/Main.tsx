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
  const { activeCookie } = useCookies("section");
  if (!sections) return <></>;

  const currentSelection = (
    <p className="text-center italic text-sm pb-5">
      Current: {activeCookie.displayName}
    </p>
  );
  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl p-5">{notebookTitle}</h1>
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
