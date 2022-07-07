import Link from "next/link";

export type LinkProps = {
  href: string;
  value: string;
};

function NavbarLink(props: LinkProps) {
  return (
    <Link href={props.href}>
      <a className="px-10">{props.value}</a>
    </Link>
  );
}

export default NavbarLink;
