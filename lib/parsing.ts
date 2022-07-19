import DOMPurify from "isomorphic-dompurify";

export const parseOneNoteRequest = (
  headers: any[],
  rows: any[][],
  title?: string
) => {
  const table = document.createElement("table");
  table.setAttribute("data-id", "trainingTable");
  const tableHeaders = document.createElement("thead");
  const tableBody = document.createElement("tbody");
  const headerRow = document.createElement("tr");
  headerRow.setAttribute("data-id", "headers");

  headers.map((header: string) => {
    const headerRowContent = document.createElement("th");
    headerRowContent.innerText = header;
    headerRow.appendChild(headerRowContent);
  });

  tableHeaders.appendChild(headerRow);

  rows.map((row: any[], index: number) => {
    const bodyRow = document.createElement("tr");
    bodyRow.setAttribute("data-id", `row-${index}`);
    row.map((content: any) => {
      const rowContent = document.createElement("td");
      rowContent.innerText = content;
      bodyRow.appendChild(rowContent);
    });

    tableBody.appendChild(bodyRow);
  });

  table.appendChild(tableHeaders);
  table.appendChild(tableBody);

  const parser = new DOMParser();
  const element = parser.parseFromString(
    `<html><head><title>${title || "Untitled"}</title></head></html>`,
    "text/html"
  );
  element.body.insertAdjacentHTML("beforeend", table.outerHTML);

  return element.documentElement.outerHTML;
};

export const parseOneNoteResponse = (page: any) => {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(page, "text/html");
  const tables = parsed.body.querySelector(`[data-id="trainingTable"]`);
  if (!tables) return;

  let resHeaders = tables.querySelectorAll("span") || [];
  let resRows = tables.querySelectorAll("tr") || [];

  const newHeaders: string[] = [];
  const newRows: string[][] = [];
  resHeaders.forEach((resHeader, index) => {
    newHeaders.push(resHeader.innerText);
  });

  for (let i = 0; i < resRows.length; ++i) {
    const rowData = resRows[i].children;
    const row: string[] = [];
    if (resRows[i].getAttribute("data-id") === "headers") continue;
    for (let j = 0; j < rowData.length; ++j) {
      row.push(rowData[j].textContent || "");
    }

    newRows.push(row);
  }

  return {
    headers: newHeaders,
    rows: newRows,
  };
};
