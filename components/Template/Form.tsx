import { ChangeEvent, MouseEvent, useState } from "react";
import TemplateActiveSelection from "./ActiveSelection";
import TemplateButtons from "./Buttons";
import TemplateInputs from "./Inputs";
import TemplatePreview from "./Preview";

type TemplateFormProps = {
  notebook: any;
  section: any;
};

/**
 * @category Components
 */
function TemplateForm(props: TemplateFormProps) {
  const [header, setHeader] = useState<string>("");
  const [headers, setHeaders] = useState<string[]>([]);

  const modifyHeader = (event: ChangeEvent<HTMLInputElement>) => {
    const headerInputValue = event.target.value;
    if (!headerInputValue) return;

    setHeader(headerInputValue);
  };

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!header) return;
    const newHeaders: string[] = [...headers];
    newHeaders.push(header);

    setHeaders(newHeaders);
  };

  return (
    <>
      <div className="w-1/2 mx-auto my-5 pb-10 bg-blue-500/75 border-2 border-violet-500 text-center text-white">
        <p className="pt-5 italic">
          Note: when you create a template, it will be stored in the{" "}
          {props.section.displayName || ""} section.
        </p>
        <div className="prose-2xl text-white py-5">Template Creation</div>

        <div className="flex flex-col justify-center">
          <TemplateActiveSelection label="Notebook" data={props.notebook} />
          <TemplateActiveSelection label="Section" data={props.section} />
        </div>

        <TemplateInputs modifyHeader={modifyHeader} />
        <TemplateButtons handleSubmit={handleSubmit} />
      </div>

      <TemplatePreview headers={headers} />
    </>
  );
}

export type { TemplateFormProps };
export default TemplateForm;
