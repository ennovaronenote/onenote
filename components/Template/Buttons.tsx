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
      <div className="flex flex-col items-center lg:flex-row lg:justify-center !text-white">
        <TemplateButton
          name="Add Header to Preview"
          onClick={props.handleSubmit}
          className="!lg:w-52"
        />

        {props.creatingPage ? (
          <TemplateButton name="Creating page now" className="!lg:w-52" />
        ) : (
          <TemplateButton
            name="Send Table to OneNote"
            className="!lg:w-56"
            onClick={props.sendTable}
          />
        )}
      </div>

      <div className="flex justify-center text-white">
        <TemplateButton
          name="Clear"
          className="!lg:w-56 bg-red-500"
          onClick={props.handleClear}
        />
      </div>
    </>
  );
}

export type { TemplateButtonsProps };
export default TemplateButtons;
