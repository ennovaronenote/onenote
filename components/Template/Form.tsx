import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import useCookies from "../../hooks/useCookies";
import TemplateButtons from "./Buttons";
import TemplateInputs from "./Inputs";
import TemplatePreviewContainer from "./Preview/Container";
import retrieveCurrentTemplate, {
  updateCurrentTemplate,
} from "../../lib/retrieveCurrentTemplate";

/**
 * @group Components
 */
function TemplateForm() {
  const { activeCookie, setCookieData } = useCookies("template");
  const [header, setHeader] = useState<string>("");

  const modifyHeader = (
    event: ChangeEvent<HTMLInputElement>,
    enterPressed?: boolean
  ) => {
    const headerInputValue = event.target.value;
    setHeader(headerInputValue);
  };

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { headers, rows } = updateCurrentTemplate(header);
    setHeader("");
    setCookieData({
      headers,
      rows,
    });
  };

  const handleEnterKey = (event: any) => {
    if (event.key !== "Enter") return;
    handleSubmit(event);
  };

  const sendTable = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <TemplatePreviewContainer activeCookie={activeCookie} />

      <div className="w-3/4 mx-auto my-5 pb-10 bg-blue-500/75 border border-violet-500 text-center text-white">
        <div className="prose-2xl text-white py-5">Template Creation</div>

        <TemplateInputs
          modifyHeader={modifyHeader}
          header={header}
          handleEnterKey={handleEnterKey}
        />
        <TemplateButtons handleSubmit={handleSubmit} sendTable={sendTable} />
      </div>
    </>
  );
}

export default TemplateForm;
