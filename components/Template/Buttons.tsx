import { MouseEventHandler } from "react";
import TemplateButton from "./Button";

type TemplateButtonsProps = {
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
};

/**
 * @category Components
 */
function TemplateButtons(props: TemplateButtonsProps) {
  return (
    <div className="flex justify-center">
      <TemplateButton name="Submit" handleSubmit={props.handleSubmit} />
      <TemplateButton name="Clear" backgroundColor="bg-red-400" />
    </div>
  );
}

export type { TemplateButtonsProps };
export default TemplateButtons;
