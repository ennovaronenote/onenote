import TemplateInput from "./Input";

type TemplateInputsProps = {};

/**
 * @category Components
 */
function TemplateInputs(props: TemplateInputsProps) {
  return (
    <div>
      <div className="w-1/2 mx-auto bg-green-500 my-5">
        <div className="pb-5 text-2xl text-neutral-700 font-sans italic antialiased">
          Template Creation
        </div>
        <TemplateInput type="text" placeholder="Header" inputName="header" />
      </div>
    </div>
  );
}

export type { TemplateInputsProps };
export default TemplateInputs;
