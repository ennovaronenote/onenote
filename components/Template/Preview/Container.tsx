import { useEffect, useState } from "react";
import TemplatePreviewTable from "./Table";

export type TemplatePreviewContainerProps = {
  activeCookie: any;
};

/**
 * @group Components
 */
function TemplatePreviewContainer(props: TemplatePreviewContainerProps) {
  return (
    <div className="container mx-auto text-center">
      <div className="prose-2xl mx-auto text-neutral-700 pt-5 pb-3">
        Preview of Template
      </div>

      <TemplatePreviewTable activeCookie={props.activeCookie} />
    </div>
  );
}
export default TemplatePreviewContainer;
