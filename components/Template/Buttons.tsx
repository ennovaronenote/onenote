import { MouseEventHandler } from "react";
import TemplateButton from "./Button";

type TemplateButtonsProps = {
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
  sendTable: MouseEventHandler<HTMLButtonElement>;
};

/**
 * @group Components
 */
function TemplateButtons(props: TemplateButtonsProps) {
  return (
    <>
      <div className="flex flex-col items-center lg:flex-row lg:justify-center">
        <TemplateButton
          name="Add Header to Preview"
          onClick={props.handleSubmit}
          className="w-52"
        />
        <TemplateButton name="Clear" className="w-52 bg-red-400" />
      </div>

      <div className="flex justify-center">
        <TemplateButton
          name="Send Table to OneNote"
          className="w-56 m-0"
          onClick={props.sendTable}
        />
      </div>
    </>
  );
}

export type { TemplateButtonsProps };
export default TemplateButtons;
