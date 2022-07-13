import NavbarLinks from "./Links";

/**
 * Container component to render the navigation bar.
 * @group Components
 */
function NavbarContainer() {
  return (
    <div className="container mx-auto border-b-2 border-violet-300 py-3">
      <NavbarLinks />
    </div>
  );
}

export default NavbarContainer;
