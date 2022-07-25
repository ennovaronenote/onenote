import { ChangeEventHandler } from "react";

type TemplateInputProps = {
  [key: string]: ChangeEventHandler<HTMLInputElement> | string | boolean | any;
  type: string;
  placeholder: string;
  inputName: string;
  handleEnterKey: any;
  value: string;
  label?: string;
  shouldFocus: boolean;
  required?: boolean;
};

/**
 * @group Components
 */
function TemplateInput(props: TemplateInputProps) {
  const { shouldFocus = false, required = false } = props;
  return (
    <div className="appearance-none">
      <span>
        {props.label && <label htmlFor={props.inputName}>{props.label}</label>}

        <input
          required={props.required}
          type={props.type}
          placeholder={props.placeholder}
          name={props.inputName}
          onChange={props.modifyInputs}
          onKeyDown={props.handleEnterKey}
          value={props.value}
          autoFocus={shouldFocus}
          className="text-left text-neutral-700 border-2 border-violet-500 my-3 px-5 py-1 focus:outline-none focus:border-violet-600 hover:border-violet-600"
        />
      </span>
    </div>
  );
}

export type { TemplateInputProps };
export default TemplateInput;
