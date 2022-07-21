const useTableData = () => {
  const parseData = (data: any[] = [], dataType: string): any[] => {
    const newDataTable: any[] = [];
    if (data.length === 0) return [];

    data.map((content: any) => {
      if (!content.id) {
        newDataTable.push(content);
      } else {
        const newData: any = {
          contentUrl: content.contentUrl || undefined,
          dataType,
          id: content.id,
          displayName: content.displayName || content.title,
          link: content.links
            ? {
                displayText: `Click here to access ${dataType} in OneNote`,
                href: content.links.oneNoteWebUrl.href,
                graphResource: `${content.self}`,
              }
            : undefined,
          creationDate: content.createdDateTime
            ? new Date(content.createdDateTime).toLocaleString()
            : undefined,
        };

        newDataTable.push(newData);
      }
    });

    return newDataTable;
  };

  return { parseData };
};

export default useTableData;
