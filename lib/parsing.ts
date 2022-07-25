import { parse } from "node-html-parser";

export const parseOneNoteRequest = (
  headers: any[],
  rows: any[][],
  tableId?: string,
  title?: string
): HTMLElement => {
  const table = document.createElement("table");
  table.setAttribute("data-id", "trainingTable");
  if (tableId) table.setAttribute("id", tableId);
  const tableHeaders = document.createElement("thead");
  const tableBody = document.createElement("tbody");
  const headerRow = document.createElement("tr");
  headerRow.setAttribute("data-id", "headers");

  headers.map((header: string) => {
    const headerRowContent = document.createElement("th");
    const headerSpan = document.createElement("span");
    headerSpan.innerText = header;
    headerRowContent.appendChild(headerSpan);
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

  return element.documentElement;
};

type ParsedResponse = {
  id: string;
  title: string;
  headers: string[];
  rows: string[][];
};

export const parseOneNoteResponse = (page: any): ParsedResponse => {
  const defaultReturn = {
    id: "",
    title: "",
    headers: [],
    rows: [[]],
  };

  const parsed = parse(page).removeWhitespace();
  const title = parsed.querySelector("title")?.innerText || "";
  const tables = parsed.querySelector(`[data-id="trainingTable"]`);
  if (!tables) return defaultReturn;

  let resHeaders: any = tables.querySelectorAll("span") || [];
  let resRows: any = tables.querySelectorAll("tr") || [];

  const newHeaders: string[] = [];
  const newRows: string[][] = [];

  resHeaders.forEach((resHeader: any, index: number) => {
    newHeaders.push(resHeader.innerText);
  });

  for (let i = 0; i < resRows.length; ++i) {
    const rowData = resRows[i].childNodes;
    const row: string[] = [];
    if (resRows[i].getAttribute("data-id") === "headers") continue;
    for (let j = 0; j < rowData.length; ++j) {
      row.push(rowData[j].textContent || "");
    }

    newRows.push(row);
  }

  const emptyHeaders = newHeaders.length === 0;
  const emptyRows = newRows.length === 0;
  const tableId: string = tables.getAttribute("id") || "";

  return emptyHeaders || emptyRows
    ? defaultReturn
    : {
        id: tableId,
        title: title,
        headers: newHeaders,
        rows: newRows,
      };
};
