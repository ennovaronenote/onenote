import { useEffect, useState } from "react";
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
  if (!sections) return <></>;

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl p-5">{notebookTitle}</h1>

      <TableContainer
        headers={["Section Name", "OneNote Link", "Creation Date"]}
        rows={parseData(sections, "section")}
      />
    </div>
  );
}

export default SectionMain;
