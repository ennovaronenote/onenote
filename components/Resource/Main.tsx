import { useEffect, useState } from "react";
import useCookies from "../../hooks/useCookies";
import useTableData from "../../hooks/useTableData";
import TableContainer from "../Table/Container";

type ResourceMainProps = {
  resource: any;
  cookieKey: string;
  tableCookieKey?: string;
  headers: any[];
};

/**
 * @group Components
 */
function ResourceMain(props: ResourceMainProps) {
  const { setCookieData, getCookieByKey, activeCookie } = useCookies(
    props.cookieKey
  );
  const { parseData } = useTableData();
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
      onClick={() => {
        return setCookieData(
          getCookieByKey(props.tableCookieKey || "notebook")
        );
      }}
    >
      <div className="text-center italic text-sm pb-3">
        Hint: if you click a row, the app will remember your selection!
      </div>

      <div>{currentSelection}</div>

      <TableContainer
        headers={props.headers}
        rows={parseData(props.resource, props.cookieKey)}
      />
    </div>
  );
}

export type { ResourceMainProps };
export default ResourceMain;
