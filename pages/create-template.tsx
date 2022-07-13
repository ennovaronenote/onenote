import { useEffect, useState } from "react";
import ErrorMessage from "../components/Error/Message";
import TemplateForm from "../components/Template/Form";
import useCookies from "../hooks/useCookies";

/**
 * @group Pages
 */
function CreateTemplate() {
  const { getCookieByKey } = useCookies("notebook");
  const [notebook, setNotebook] = useState<any>();
  const [section, setSection] = useState<any>();
  const [error, setError] = useState<JSX.Element | boolean>(true);

  useEffect(() => {
    const notebookCookie = getCookieByKey("notebook");
    const sectionCookie = getCookieByKey("section");

    if (notebookCookie["error"]) {
      return setError(<ErrorMessage error={notebookCookie["error"]} />);
    }

    if (sectionCookie["error"]) {
      return setError(<ErrorMessage error={sectionCookie["error"]} />);
    }

    if (!notebookCookie || !sectionCookie)
      return setError(
        <ErrorMessage
          error={{
            code: "InvalidData",
            message:
              "You tried to create a template but there was no selected notebook or section!",
          }}
        />
      );

    if (!notebookCookie["displayName"] || !sectionCookie["displayName"])
      return setError(
        <ErrorMessage
          error={{
            code: "InvalidData",
            message:
              "You tried to create a template but there was no selected notebook or section!",
          }}
        />
      );

    setError(false);
    setNotebook(notebookCookie);
    setSection(sectionCookie);
  }, []);

  if (error) {
    return <>{error}</>;
  }

  return (
    <div className="container mx-auto">
      <TemplateForm notebook={notebook} section={section} />
    </div>
  );
}
export default CreateTemplate;
