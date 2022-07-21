import { hasCookie } from "cookies-next";
import { useEffect, useState } from "react";
import useCookies from "../../hooks/useCookies";
import useTemplates from "../../hooks/useTemplates";
import NavbarLink from "./Link";

/**
 * A container to hold necessary links for navigation.
 * @group Components
 */
function NavbarLinks() {
  return (
    <div className="container mx-auto flex flex-row justify-around">
      <NavbarLink href="/" value="Home" />
      <NavbarLink href="/view-notebooks" value="View Notebooks" />
      <NavbarLink href="/view-sections" value="View Sections" />
      <NavbarLink href="/view-pages" value="View Pages" />
      <NavbarLink href="/create-template" value="Create Template" />
      <NavbarLink href="/view-student-pages" value="View Student Profiles" />
      <NavbarLink href="/add-student" value="Add Template to Student Profile" />
    </div>
  );
}

export default NavbarLinks;
