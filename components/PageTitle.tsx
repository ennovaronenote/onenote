export type PageTitleProps = {
  title: string;
};

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <h1 className="prose-2xl text-neutral-700 mx-auto text-center py-5">
      {title}
    </h1>
  );
}
