import TemplateActiveSelection from "./ActiveSelection";
import TemplateInputs from "./Inputs";

type TemplateFormProps = {
  notebook: any;
  section: any;
};

/**
 * @category Components
 */
function TemplateForm(props: TemplateFormProps) {
  return (
    <div className="container mx-auto text-center">
      <div className="flex flex-col justify-center">
        <TemplateActiveSelection data={props.notebook} />
        <TemplateActiveSelection data={props.section} />
      </div>

      <TemplateInputs />
    </div>
  );
}

export type { TemplateFormProps };
export default TemplateForm;
