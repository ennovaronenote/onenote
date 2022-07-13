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
      <NavbarLink href="/create-template" value="Create Template" />
      <NavbarLink href="/" value="Login" />
    </div>
  );
}

export default NavbarLinks;
