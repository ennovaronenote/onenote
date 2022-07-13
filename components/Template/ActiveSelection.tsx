type TemplateActiveSelectionProps = {
  data: any;
  label: string;
};

/**
 * @category Components
 */
function TemplateActiveSelection(props: TemplateActiveSelectionProps) {
  return (
    <div>
      <span>{props.label}: </span>
      {props.data.displayName}
    </div>
  );
}
export type { TemplateActiveSelectionProps };
export default TemplateActiveSelection;
