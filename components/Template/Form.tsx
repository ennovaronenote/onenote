import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import useCookies from "../../hooks/useCookies";
import TemplateButtons from "./Buttons";
import TemplateInputs from "./Inputs";
import TemplatePreviewContainer from "./Preview/Container";
import { updateCurrentTemplate } from "../../lib/retrieveCurrentTemplate";
import { parseOneNoteRequest, parseOneNoteResponse } from "../../lib/parsing";
import PageTitle from "../PageTitle";
import createTemplate from "../../lib/createTemplate";

/**
 * @group Components
 */
function TemplateForm(props: any) {
  const { activeCookie, setCookieData, getCookieByKey } =
    useCookies("template");
  const [inputs, setInputs] = useState<any>({
    header: "",
    rowData: "",
    templateName: "",
  });
  const [creatingPage, setCreatingPage] = useState<boolean>(false);
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
    if (!inputs.header || !inputs.templateName) return;

    const { headers = [], rows = [] } = updateCurrentTemplate(
      inputs.header,
      inputs.rowData
    );

    handleClear(event, true);
    setCookieData({
      tableId: activeCookie.tableId,
      headers,
      rows,
    });
  };

  // Clears only the header field so the app knows how to title the page
  const handleClear = (
    event: MouseEvent<HTMLButtonElement>,
    shouldKeepTemplateName?: boolean
  ) => {
    event.preventDefault();

    const getKeys = Object.keys(inputs);
    const clearedInputs: any = {};

    getKeys.forEach((key: string) => {
      if (key === "templateName" && shouldKeepTemplateName)
        clearedInputs[key] = inputs[key];
      else clearedInputs[key] = "";
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
    setCreatingPage(true);

    const { headers = [], rows = [[]], tableId = "" } = activeCookie;
    const parsed: HTMLElement = inputs.templateName
      ? parseOneNoteRequest(headers, rows, tableId, inputs.templateName)
      : parseOneNoteRequest(headers, rows, tableId);

    const pageCookie = getCookieByKey("page");
    if (!pageCookie) return setCreatingPage(false);

    const { displayName = "" } = pageCookie;
    const { templateName = "" } = inputs;
    await createTemplate(parsed, displayName, templateName, tableId);
    setCreatingPage(false);
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

      const parsed = parseOneNoteResponse(props.selectedPage);
      const emptyHeaders = parsed.headers.length === 0;
      const emptyRows = parsed.rows.length === 0;

      if (!emptyHeaders && !emptyRows) {
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
