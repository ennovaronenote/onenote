import Link from "next/link";

function NotebookCell({
  content,
  contentType,
}: {
  content: any;
  contentType?: string;
}) {
  if (!content) return <></>;
  const contentLink = (
    <Link href={content.href}>
      <a>Click here to access notebook in OneNote</a>
    </Link>
  );

  if (contentType === "date") {
    content = new Date(content).toLocaleString();
  }

  return (
    <div className="table-cell border-solid border-b-2 border-y-violet-400 m-2 text-center py-3 text-blue-500">
      {contentType === "link" ? contentLink : content}
    </div>
  );
}

export default NotebookCell;
