import NotebookCell from "./Cell";
import NotebookHeader from "./Header";

/**
 * @group Components
 * @returns
 */
function NotebookList({ notebooks }: any) {
  if (!notebooks) return <></>;

  return (
    <div className="table w-3/4 mx-auto">
      {/* HEADERS */}
      <div className="table-header-group bg-blue-500 text-white">
        <div className="table-row">
          <NotebookHeader title="Notebook Title" />
          <NotebookHeader title="OneNote Link for Sections" />
          <NotebookHeader title="Creation Date" />
        </div>
      </div>

      {/* LIST OF NOTEBOOKS */}
      <div className="table-row-group">
        {notebooks.map((notebook: any) => {
          return (
            <div className="table-row" key={notebook.id}>
              <NotebookCell content={notebook.displayName} />
              <NotebookCell
                content={notebook.links.oneNoteWebUrl}
                contentType="link"
              />
              <NotebookCell
                content={notebook.createdDateTime}
                contentType="date"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NotebookList;
