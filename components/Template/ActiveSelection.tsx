type TemplateActiveSelectionProps = {
  data: any;
};

/**
 * @category Components
 */
function TemplateActiveSelection(props: TemplateActiveSelectionProps) {
  return (
    <div>
      <span className="text-red-500">Notebook: </span>
      {props.data.displayName}
    </div>
  );
}
export type { TemplateActiveSelectionProps };
export default TemplateActiveSelection;
