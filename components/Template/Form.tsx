import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import useCookies from "../../hooks/useCookies";
import TemplateButtons from "./Buttons";
import TemplateInputs from "./Inputs";
import TemplatePreviewContainer from "./Preview/Container";
import retrieveCurrentTemplate, {
  updateCurrentTemplate,
} from "../../lib/retrieveCurrentTemplate";
import { parseOneNoteRequest, parseOneNoteResponse } from "../../lib/parsing";

/**
 * @group Components
 */
function TemplateForm(props: any) {
  const { activeCookie, setCookieData } = useCookies("template");
  const [header, setHeader] = useState<string>("");
  const [templateName, setTemplateName] = useState<string>("");
  const [creatingPage, setCreatingPage] = useState<boolean>(false);

  const modifyHeader = (event: ChangeEvent<HTMLInputElement>) => {
    const headerInputValue = event.target.value;
    setHeader(headerInputValue);
  };

  const modifyTemplateName = (event: ChangeEvent<HTMLInputElement>) => {
    const templateInputValue = event.target.value;
    setTemplateName(templateInputValue);
  };

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { headers, rows } = updateCurrentTemplate(header);
    setHeader("");
    setTemplateName("");
    setCookieData({
      headers,
      rows,
    });
  };

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setHeader("");
    setTemplateName("");
  };

  const handleEnterKey = (event: any) => {
    if (event.key !== "Enter") return;
    handleSubmit(event);
  };

  const sendTable = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { headers = [], rows = [[]] } = activeCookie;
    const parsed = parseOneNoteRequest(headers, rows, templateName);

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "text/html",
      },
      body: parsed,
    };

    setCreatingPage(true);
    const createPage = await fetch(
      "http://localhost:3000/api/create-page",
      fetchOptions
    );
    setCreatingPage(false);
  };

  useEffect(() => {
    if (props.selectedPage) {
      parseOneNoteResponse(props.selectedPage);
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
