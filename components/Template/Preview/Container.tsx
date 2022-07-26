import { useEffect, useState } from "react";
import PageTitle from "../../PageTitle";
import TemplatePreviewTable from "./Table";

export type TemplatePreviewContainerProps = {
  activeCookie: any;
  templateName?: string;
};

/**
 * @group Components
 */
function TemplatePreviewContainer(props: TemplatePreviewContainerProps) {
  return (
    <div className="container mx-auto text-center">
      <PageTitle
        title="Preview of Template"
        classNames="pt-5 pb-3"
        shouldRender={
          !(
            typeof props.templateName === "undefined" ||
            props.templateName === ""
          ) && !props.activeCookie.error
        }
      >
        <>{props.templateName && <span> ({props.templateName})</span>}</>
      </PageTitle>

      <TemplatePreviewTable activeCookie={props.activeCookie} />
    </div>
  );
}
export default TemplatePreviewContainer;
