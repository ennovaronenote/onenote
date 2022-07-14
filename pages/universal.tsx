import { useEffect } from "react";
import useErrors from "../hooks/useErrors";

/**
 * @group Pages
 */
function Universal() {
  const test = useErrors({
    cookieName: "notebook",
    propertyToValidate: "",
  });

  useEffect(() => {}, []);

  return <div></div>;
}

export default Universal;
