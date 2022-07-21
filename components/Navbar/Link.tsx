import Link from "next/link";

export type LinkProps = {
  href: string;
  value: string;
};

/**
 * Utilizes LinkProps type to render a valid navigation link.
 * @param props
 * @group Components
 */
function NavbarLink(props: LinkProps) {
  return (
    <>
      <Link href={props.href}>
        <div className="px-10 py-2 hover:text-neutral-700 hover:cursor-pointer lg:py-0">
          {props.value}
        </div>
      </Link>
    </>
  );
}

export default NavbarLink;
