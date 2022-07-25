import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import useCookies from "../../hooks/useCookies";
import TemplateButtons from "./Buttons";
import TemplateInputs from "./Inputs";
import TemplatePreviewContainer from "./Preview/Container";
import { updateCurrentTemplate } from "../../lib/retrieveCurrentTemplate";
import { parseOneNoteRequest, parseOneNoteResponse } from "../../lib/parsing";
import PageTitle from "../PageTitle";

/**
 * @group Components
 */
function TemplateForm(props: any) {
  const { activeCookie, setCookieData, getCookieByKey } =
    useCookies("template");
  const [inputs, setInputs] = useState<any>({});
  const [header, setHeader] = useState<string>("");
  const [templateName, setTemplateName] = useState<string>("");
  const [creatingPage, setCreatingPage] = useState<boolean>(false);
  const [rowData, setRowData] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const modifyInputs = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputs((prevInputs: any) => {
      return {
        ...prevInputs,
        [name]: value,
      };
    });
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

    const getKeys = Object.keys(inputs);
    const clearedInputs: any = {};

    getKeys.forEach((key: string) => {
      clearedInputs[key] = "";
    });

    setInputs(clearedInputs);
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
    try {
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
    } catch (error) {
      console.error(`Error when sending OneNote table: ${error}`);
      setCreatingPage(false);
      return setError(true);
    }
  };

  // If there is a page selected, parse its HTML and set the cookie data accordingly.
  useEffect(() => {
    if (props.selectedPage) {
      setInputs((prevInputs: any) => {
        return {
          ...prevInputs,
          templateName: props.title,
        };
      });

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
      {error ? (
        <div className="text-xl text-center py-5">
          An unexpected error seemed to occur. Are you sure you entered proper
          data?
        </div>
      ) : (
        <>
          <div className="w-3/4 mx-auto my-5 pb-10 text-center text-neutral-700 lg:w-1/2">
            <PageTitle title="Template Creation" />

            <TemplateInputs
              modifyInputs={modifyInputs}
              inputFields={inputs}
              handleEnterKey={handleEnterKey}
            />

            <TemplateButtons
              handleSubmit={handleSubmit}
              handleClear={handleClear}
              sendTable={sendTable}
              creatingPage={creatingPage}
            />
          </div>

          <TemplatePreviewContainer
            templateName={inputs.templateName}
            activeCookie={activeCookie}
          />
        </>
      )}
    </>
  );
}

export default TemplateForm;
