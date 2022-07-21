import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import useCookies from "../../hooks/useCookies";
import TemplateButtons from "./Buttons";
import TemplateInputs from "./Inputs";
import TemplatePreviewContainer from "./Preview/Container";
import { updateCurrentTemplate } from "../../lib/retrieveCurrentTemplate";
import { parseOneNoteRequest, parseOneNoteResponse } from "../../lib/parsing";

/**
 * @group Components
 */
function TemplateForm(props: any) {
  const { activeCookie, setCookieData, getCookieByKey } =
    useCookies("template");
  const [header, setHeader] = useState<string>("");
  const [templateName, setTemplateName] = useState<string>("");
  const [creatingPage, setCreatingPage] = useState<boolean>(false);
  const [rowData, setRowData] = useState<string>("");

  // Header acts as an individual header for a column in the table
  const modifyHeader = (event: ChangeEvent<HTMLInputElement>) => {
    const headerInputValue = event.target.value;
    setHeader(headerInputValue);
  };

  // Template name will act as a title of the page in OneNote
  const modifyTemplateName = (event: ChangeEvent<HTMLInputElement>) => {
    const templateInputValue = event.target.value;
    setTemplateName(templateInputValue);
  };

  const modifyRowData = (event: ChangeEvent<HTMLInputElement>) => {
    const rowInputValue = event.target.value;
    setRowData(rowInputValue);
  };

  // Resets the input data and sets the cookie that includes the list of headers and rows
  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { headers = [], rows = [] } = updateCurrentTemplate(
      header,
      rowData || undefined
    );
    setHeader("");
    setRowData("");
    setCookieData({
      tableId: activeCookie.tableId,
      headers,
      rows,
    });
  };

  // Clears only the header field so the app knows how to title the page
  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setHeader("");
    setRowData("");
    setCookieData({
      tableId: activeCookie.tableId,
      headers: [],
      rows: [],
    });
  };

  // Essentially an alias of handleSubmit
  const handleEnterKey = (event: any) => {
    if (event.key !== "Enter") return;
    handleSubmit(event);
  };

  // Performs necessary parsing on the HTML so that the data can successfully be sent to OneNote
  const sendTable = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { headers = [], rows = [[]], tableId = "" } = activeCookie;
    const parsed = templateName
      ? parseOneNoteRequest(headers, rows, tableId, templateName)
      : parseOneNoteRequest(headers, rows, tableId);

    const htmlOutput =
      parsed.querySelector(`[data-id="trainingTable"]`)?.outerHTML ||
      parsed.outerHTML;
    const table = parsed.querySelector(`[data-id="trainingTable"]`);
    const tableID = table?.getAttribute("id") || "";
    const fetchBody: any = { content: JSON.stringify({}) };
    const pageCookie = getCookieByKey("page") || {};

    if (pageCookie.displayName !== templateName) {
      fetchBody["content"] = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          html: parsed.outerHTML,
        }),
      };
    } else {
      const createPageBody = {
        target: tableId,
        action: "replace",
        content: htmlOutput,
      };
      fetchBody["content"] = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([createPageBody]),
      };
    }

    setCreatingPage(true);
    const createPage = await fetch(
      "http://localhost:3000/api/create-page",
      fetchBody["content"]
    );
    const createPageResponse = await createPage.json();
    const error = createPageResponse.error;

    if (error) console.log(`Error ${JSON.stringify(error)}`);

    setCookieData({
      tableId: createPageResponse.id,
      headers: createPageResponse.headers,
      rows: createPageResponse.rows,
    });

    setCreatingPage(false);
  };

  // If there is a page selected, parse its HTML and set the cookie data accordingly.
  useEffect(() => {
    if (props.selectedPage) {
      setTemplateName(props.title);

      const parsed = parseOneNoteResponse(props.selectedPage) || {
        id: "",
        headers: [],
        rows: [],
      };

      if (parsed.headers.length !== 0 && parsed.rows.length !== 0) {
        setCookieData({
          tableId: parsed.id,
          headers: parsed.headers,
          rows: parsed.rows,
        });
      }
    }
  }, [props]);

  // Actual JSX returned
  return (
    <>
      <TemplatePreviewContainer
        templateName={templateName}
        activeCookie={activeCookie}
      />

      <div className="w-3/4 mx-auto my-5 pb-10 bg-blue-500/75 border border-violet-500 text-center text-white">
        <div className="prose-2xl text-white py-5">Template Creation</div>

        <TemplateInputs
          modifyHeader={modifyHeader}
          modifyTemplateName={modifyTemplateName}
          modifyRowData={modifyRowData}
          rowData={rowData}
          header={header}
          templateName={templateName}
          handleEnterKey={handleEnterKey}
        />
        <TemplateButtons
          handleSubmit={handleSubmit}
          handleClear={handleClear}
          sendTable={sendTable}
          creatingPage={creatingPage}
        />
      </div>
    </>
  );
}

export default TemplateForm;
