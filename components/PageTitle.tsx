export type PageTitleProps = {
  title: string;
  classNames?: string;
  children?: JSX.Element[] | JSX.Element;
  shouldRender?: boolean;
};

export default function PageTitle({
  title,
  classNames,
  children = <></>,
  shouldRender = true,
}: PageTitleProps) {
  return (
    <>
      {shouldRender ? (
        <div
          className={`prose-2xl text-neutral-700 mx-auto text-center py-5 ${classNames}`}
        >
          {title}

          {children}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
