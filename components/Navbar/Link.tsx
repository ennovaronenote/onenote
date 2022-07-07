import Link from "next/link";

export type LinkProps = {
  href: string;
  value: string;
};

/**
 * Utilizes LinkProps type to render a valid navigation link.
 * @param props
 */
function NavbarLink(props: LinkProps) {
  return (
    <Link href={props.href}>
      <a className="px-10">{props.value}</a>
    </Link>
  );
}

export default NavbarLink;
