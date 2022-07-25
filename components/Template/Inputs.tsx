import { ChangeEventHandler } from "react";
import TemplateInput from "./Input";

type TemplateInputsProps = {
  modifyInputs: ChangeEventHandler<HTMLInputElement>;
  inputFields: any;
  handleEnterKey: any;
};

/**
 * @group Components
 */
function TemplateInputs(props: TemplateInputsProps) {
  return (
    <div className="">
      <TemplateInput
        type="text"
        placeholder="Header"
        inputName="header"
        value={props.inputFields?.header}
        modifyInputs={props.modifyInputs}
        shouldFocus={true}
        handleEnterKey={props.handleEnterKey}
      />

      <TemplateInput
        type="text"
        placeholder="Row Data"
        inputName="rowData"
        value={props.inputFields?.rowData}
        modifyInputs={props.modifyInputs}
        shouldFocus={false}
        handleEnterKey={props.handleEnterKey}
      />

      <TemplateInput
        type="text"
        placeholder="Template Name"
        inputName="templateName"
        value={props.inputFields?.templateName}
        modifyInputs={props.modifyInputs}
        shouldFocus={false}
        handleEnterKey={props.handleEnterKey}
      />
    </div>
  );
}

export type { TemplateInputsProps };
export default TemplateInputs;
