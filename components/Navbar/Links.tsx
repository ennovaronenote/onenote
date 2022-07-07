import NavbarLink from "./Link";

function NavbarLinks() {
  return (
    <div className="container mx-auto flex flex-row justify-end">
      <NavbarLink href="/" value="Home" />
      <NavbarLink href="/" value="Home" />
      <NavbarLink href="/" value="Login" />
    </div>
  );
}

export default NavbarLinks;
