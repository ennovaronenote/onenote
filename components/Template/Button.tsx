import { MouseEventHandler } from "react";

type TemplateButtonProps = {
  name: string;
  handleSubmit?: MouseEventHandler<HTMLButtonElement>;
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
        props.handleSubmit
          ? props.handleSubmit
          : () => console.log("No handler was sent!")
      }
    >
      {props.name}
    </button>
  );
}

export type { TemplateButtonProps };
export default TemplateButton;
