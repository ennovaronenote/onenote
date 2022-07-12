function NotebookHeader({ title }: { title: string }) {
  return (
    <div className="table-cell border-b border-violet-500 text-center py-2 text-2xl">
      {title}
    </div>
  );
}

export default NotebookHeader;
