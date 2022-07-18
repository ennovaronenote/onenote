import { MouseEventHandler } from "react";
import TemplateButton from "./Button";

type TemplateButtonsProps<T> = {
  handleSubmit: T;
  handleClear: T;
  sendTable: T;
  creatingPage: boolean;
};

/**
 * @group Components
 */
function TemplateButtons(
  props: TemplateButtonsProps<MouseEventHandler<HTMLButtonElement>>
) {
  return (
    <>
      <div className="flex flex-col items-center lg:flex-row lg:justify-center">
        <TemplateButton
          name="Add Header to Preview"
          onClick={props.handleSubmit}
          className="w-52"
        />

        {props.creatingPage ? (
          <TemplateButton name="Creating page now" className="w-52" />
        ) : (
          <TemplateButton
            name="Send Table to OneNote"
            className="w-52"
            onClick={props.sendTable}
          />
        )}
      </div>

      <div className="flex justify-center">
        <TemplateButton
          name="Clear"
          className="w-56 m-0 bg-red-400"
          onClick={props.handleClear}
        />
      </div>
    </>
  );
}

export type { TemplateButtonsProps };
export default TemplateButtons;
