import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import useCookies from "../../hooks/useCookies";
import TemplateActiveSelection from "./ActiveSelection";
import TemplateButtons from "./Buttons";
import TemplateInputs from "./Inputs";
import TemplatePreview from "./Preview";

type TemplateFormProps = {
  notebook: any;
  section: any;
};

/**
 * @group Components
 */
function TemplateForm(props: TemplateFormProps) {
  const { activeCookie, setData } = useCookies("template");
  const [header, setHeader] = useState<string>("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[]>([]);

  useEffect(() => {
    if (!activeCookie["headers"] || !activeCookie["rows"]) return;
    if (activeCookie["headers"].length === 0) return;
    if (activeCookie["rows"].length === 0) return;

    if (headers.length === 0) setHeaders(activeCookie["headers"]);
    if (rows.length === 0) setRows(activeCookie["rows"]);
  }, [activeCookie]);

  const modifyHeader = (event: ChangeEvent<HTMLInputElement>) => {
    const headerInputValue = event.target.value;
    setHeader(headerInputValue);
  };

  const generateSampleRows = (headers: string[]): string[] => {
    if (headers.length === 0) return [];

    const sampleRows: string[] = headers.map(
      (header: string) => `Sample row data (${header})`
    );

    return sampleRows;
  };

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!header) return;
    const newHeaders: string[] = [...headers];
    newHeaders.push(header);

    const sampleRows = generateSampleRows(newHeaders);
    if (sampleRows.length === 0) return;

    setHeaders(newHeaders);
    setRows(sampleRows);
    setData({
      headers: newHeaders,
      rows: sampleRows,
    });
    setHeader("");
  };

  return (
    <>
      <TemplatePreview headers={headers} rows={rows} />

      <div className="w-3/4 mx-auto my-5 pb-10 bg-blue-500/75 border border-violet-500 text-center text-white">
        <div className="prose-2xl text-white py-5">Template Creation</div>

        <div className="flex flex-col justify-center">
          <TemplateActiveSelection label="Notebook" data={props.notebook} />
          <TemplateActiveSelection label="Section" data={props.section} />
        </div>

        <TemplateInputs modifyHeader={modifyHeader} header={header} />
        <TemplateButtons handleSubmit={handleSubmit} />

        <p className="pt-5 italic">
          Note: when you create a template, it will be stored in the{" "}
          {props.section.displayName || ""} section.
        </p>
      </div>
    </>
  );
}

export type { TemplateFormProps };
export default TemplateForm;
