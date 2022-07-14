import { ChangeEventHandler } from "react";
import TemplateInput from "./Input";

type TemplateInputsProps = {
  modifyHeader: ChangeEventHandler<HTMLInputElement>;
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
      />
    </div>
  );
}

export type { TemplateInputsProps };
export default TemplateInputs;
