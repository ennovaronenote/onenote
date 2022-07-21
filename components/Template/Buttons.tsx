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
          className="hover:border-red-500 hover:border !lg:w-52"
        />

        {props.creatingPage ? (
          <TemplateButton
            name="Creating page now"
            className="hover:border-red-500 hover:border !lg:w-52"
          />
        ) : (
          <TemplateButton
            name="Send Table to OneNote"
            className="hover:border-red-500 hover:border !lg:w-56"
            onClick={props.sendTable}
          />
        )}
      </div>

      <div className="flex justify-center">
        <TemplateButton
          name="Clear"
          className="!lg:w-56 bg-red-500 hover:border-violet-500/75 hover:border-2"
          onClick={props.handleClear}
        />
      </div>
    </>
  );
}

export type { TemplateButtonsProps };
export default TemplateButtons;
