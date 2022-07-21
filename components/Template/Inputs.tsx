import { ChangeEventHandler } from "react";
import TemplateInput from "./Input";

type TemplateInputsProps = {
  [key: string]: ChangeEventHandler<HTMLInputElement> | any | string;
  handleEnterKey: any;
  header: string;
  templateName: string;
};

/**
 * @group Components
 */
function TemplateInputs(props: TemplateInputsProps) {
  return (
    <div>
      <TemplateInput
        type="text"
        placeholder="Header"
        inputName="header"
        value={props.header}
        modifyHeader={props.modifyHeader}
        shouldFocus={true}
        handleEnterKey={props.handleEnterKey}
      />

      <TemplateInput
        type="text"
        placeholder="Row Data"
        inputName="rowData"
        value={props.rowData}
        modifyHeader={props.modifyRowData}
        shouldFocus={false}
        handleEnterKey={props.handleEnterKey}
      />

      <TemplateInput
        type="text"
        placeholder="Template Name"
        inputName="header"
        value={props.templateName}
        modifyTemplateName={props.modifyTemplateName}
        shouldFocus={false}
        handleEnterKey={props.handleEnterKey}
      />
    </div>
  );
}

export type { TemplateInputsProps };
export default TemplateInputs;
