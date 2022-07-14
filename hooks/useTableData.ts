const useTableData = () => {
  const parseData = (data: any[] = [], dataType: string): any[] => {
    const newDataTable: any[] = [];
    if (data.length === 0) return [];

    data.map((content: any) => {
      const newData = {
        dataType,
        id: content.id,
        displayName: content.displayName || content.title,
        link: {
          displayText: `Click here to access ${dataType} in OneNote`,
          href: content.links.oneNoteWebUrl.href,
        },
        creationDate: new Date(content.createdDateTime).toLocaleString(),
      };

      newDataTable.push(newData);
    });

    return newDataTable;
  };

  return { parseData };
};

export default useTableData;
