type TemplateInputProps = {
  type: string;
  placeholder: string;
  inputName: string;
  label?: string;
};

/**
 * @category Components
 */
function TemplateInput(props: TemplateInputProps) {
  return (
    <div className="appearance-none">
      <span>
        {props.label && <label htmlFor={props.inputName}>{props.label}</label>}

        <input
          type={props.type}
          placeholder={props.placeholder}
          name={props.inputName}
          className="text-center border-2 border-sky-300 my-3 py-1 focus:outline-none focus:border-sky-400 hover:border-sky-400"
        />
      </span>
    </div>
  );
}

export type { TemplateInputProps };
export default TemplateInput;
