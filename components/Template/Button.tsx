import { MouseEvent, MouseEventHandler } from "react";
import { updateCurrentTemplate } from "../../lib/retrieveCurrentTemplate";

type TemplateButtonProps = {
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

/**
 * @group Components
 */
function TemplateButton(props: TemplateButtonProps) {
  return (
    <button
      className={`w-28 bg-violet-500 rounded-full text-center mx-3 my-5 p-3 font-sans font-semibold ${props.className}`}
      onClick={
        props.onClick
          ? props.onClick
          : () => console.log("No handler was sent!")
      }
    >
      {props.name}
    </button>
  );
}

export type { TemplateButtonProps };
export default TemplateButton;
