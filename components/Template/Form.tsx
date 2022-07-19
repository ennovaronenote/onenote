import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import useCookies from "../../hooks/useCookies";
import TemplateButtons from "./Buttons";
import TemplateInputs from "./Inputs";
import TemplatePreviewContainer from "./Preview/Container";
import retrieveCurrentTemplate, {
  updateCurrentTemplate,
} from "../../lib/retrieveCurrentTemplate";
import { parseOneNoteRequest, parseOneNoteResponse } from "../../lib/parsing";
import { parse } from "node-html-parser";

/**
 * @group Components
 */
function TemplateForm(props: any) {
  const { activeCookie, setCookieData } = useCookies("template");
  const [header, setHeader] = useState<string>("");
  const [templateName, setTemplateName] = useState<string>("");
  const [creatingPage, setCreatingPage] = useState<boolean>(false);

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

  // Resets the input data and sets the cookie that includes the list of headers and rows
  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { headers, rows } = updateCurrentTemplate(header);
    handleClear(event);
    setCookieData({
      headers,
      rows,
    });
  };

  // Clears only the header field so the app knows how to title the page
  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setHeader("");
  };

  // Essentially an alias of handleSubmit
  const handleEnterKey = (event: any) => {
    if (event.key !== "Enter") return;
    handleSubmit(event);
  };

  // Performs necessary parsing on the HTML so that the data can successfully be sent to OneNote
  const sendTable = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { headers = [], rows = [[]] } = activeCookie;
    const parsed = parseOneNoteRequest(headers, rows, templateName);

    const htmlOutput =
      parsed.querySelector(`[data-id="trainingTable"]`)?.outerHTML ||
      parsed.outerHTML;

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "text/html",
      },
      body: htmlOutput,
    };

    setCreatingPage(true);
    const createPage = await fetch(
      "http://localhost:3000/api/create-page",
      fetchOptions
    );
    setCreatingPage(false);
  };

  // If there is a page selected, parse its HTML and set the cookie data accordingly.
  useEffect(() => {
    if (props.selectedPage) {
      const parsed = parseOneNoteResponse(props.selectedPage) || {
        headers: [],
        rows: [],
      };

      if (parsed.headers.length !== 0 && parsed.rows.length !== 0) {
        setCookieData({
          headers: parsed.headers,
          rows: parsed.rows,
        });
      }
    }
  }, [props]);

  // Actual JSX returned
  return (
    <>
      <TemplatePreviewContainer activeCookie={activeCookie} />

      <div className="w-3/4 mx-auto my-5 pb-10 bg-blue-500/75 border border-violet-500 text-center text-white">
        <div className="prose-2xl text-white py-5">Template Creation</div>

        <TemplateInputs
          modifyHeader={modifyHeader}
          modifyTemplateName={modifyTemplateName}
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
