import { useEffect, useState } from "react";
import TableContainer from "../Table/Container";

type TemplatePreviewProps = {
  headers: string[];
  rows: string[];
};

/**
 * @group Components
 */
function TemplatePreview(props: TemplatePreviewProps) {
  if (props.headers.length === 0 || props.rows.length === 0) return <></>;

  return (
    <div className="container mx-auto text-center">
      <div className="prose-2xl mx-auto text-neutral-700 pt-5 pb-3">
        Preview of Template
      </div>

      <TableContainer
        headers={props.headers}
        rows={[props.rows]}
        customDataType="previewRows"
      />
    </div>
  );
}

export type { TemplatePreviewProps };
export default TemplatePreview;
