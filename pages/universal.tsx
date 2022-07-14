import { useEffect } from "react";
import useCookies from "../hooks/useCookies";

/**
 * @group Pages
 */
function Universal() {
  const { getCookieByKey, activeCookie } = useCookies("notebook");

  useEffect(() => {
    console.log(activeCookie);
  }, [activeCookie]);

  return (
    <div>
      <p>Universal</p>
    </div>
  );
}

export default Universal;
