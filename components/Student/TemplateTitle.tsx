export type TemplatetitleProps = {
  template: any;
};

export default function TemplateTitle({ template }: TemplatetitleProps) {
  return <option value={template.title}>{template.title}</option>;
}
