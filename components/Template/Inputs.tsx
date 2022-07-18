import { ChangeEventHandler } from "react";
import TemplateInput from "./Input";

type TemplateInputsProps = {
  modifyHeader: ChangeEventHandler<HTMLInputElement>;
  handleEnterKey: any;
  header: string;
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
    </div>
  );
}

export type { TemplateInputsProps };
export default TemplateInputs;
