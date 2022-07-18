import { ChangeEventHandler } from "react";

type TemplateInputProps = {
  type: string;
  placeholder: string;
  inputName: string;
  modifyHeader: ChangeEventHandler<HTMLInputElement>;
  handleEnterKey: any;
  value: string;
  label?: string;
  shouldFocus: boolean;
};

/**
 * @group Components
 */
function TemplateInput(props: TemplateInputProps) {
  const { shouldFocus = false } = props;
  return (
    <div className="appearance-none">
      <span>
        {props.label && <label htmlFor={props.inputName}>{props.label}</label>}

        <input
          type={props.type}
          placeholder={props.placeholder}
          name={props.inputName}
          onChange={props.modifyHeader}
          onKeyDown={props.handleEnterKey}
          value={props.value}
          autoFocus={shouldFocus}
          className="text-left text-neutral-700 border-2 border-violet-500 my-3 py-1 pl-3 focus:outline-none focus:border-violet-600 hover:border-violet-600"
        />
      </span>
    </div>
  );
}

export type { TemplateInputProps };
export default TemplateInput;
