import { ChangeEventHandler } from "react";
import TemplateInput from "./Input";

type TemplateInputsProps = {
  modifyHeader: ChangeEventHandler<HTMLInputElement>;
};

/**
 * @category Components
 */
function TemplateInputs(props: TemplateInputsProps) {
  return (
    <div>
      <div className="">
        <TemplateInput
          type="text"
          placeholder="Header"
          inputName="header"
          modifyHeader={props.modifyHeader}
        />
      </div>
    </div>
  );
}

export type { TemplateInputsProps };
export default TemplateInputs;
