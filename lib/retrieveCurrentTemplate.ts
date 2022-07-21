import {
  CookieValueTypes,
  getCookie,
  hasCookie,
  setCookie,
} from "cookies-next";

export default function retrieveCurrentTemplate() {
  const errorObject = { error: true, rows: [], headers: [] };
  // Find a template cookie and check its type
  const templateCookieExists: boolean = hasCookie("template");
  const templateCookie: CookieValueTypes = templateCookieExists
    ? getCookie("template")
    : undefined;
  const cookieIsParseable: boolean = typeof templateCookie === "string";

  // If it's parseable, properly set the headers and rows for modularity.
  if (cookieIsParseable && templateCookie) {
    const parsedTemplate = JSON.parse(templateCookie.toString());
    const { headers = [], rows = [] } = parsedTemplate;

    if (headers.length === 0 || rows.length === 0) {
      setCookie("template", { headers, rows }, { sameSite: "lax" });
    }

    return {
      error: false,
      headers,
      rows: [rows],
    };
  } else {
    const cookie = { headers: [], rows: [] };
    setCookie("template", JSON.stringify(cookie), {
      sameSite: "lax",
    });

    return errorObject;
  }
}

function generateNewRows(headers: string[], row?: string): string[] {
  if (headers.length === 0) return [];

  const newRows: string[] = headers.map((header: string, index: number) => {
    if (index === headers.length - 1 && row) return row;
    return `Sample row data (${header})`;
  });
  return newRows || [];
}

export function updateCurrentTemplate(header: string, rowData?: string) {
  const { headers = [], rows = [], error } = retrieveCurrentTemplate();
  if (error) return { error };
  if (!header) return { error: true };

  const newHeaders = [...headers, header];
  const newRows = [generateNewRows(newHeaders, rowData)];

  setCookie(
    "template",
    JSON.stringify({
      headers: newHeaders,
      rows: newRows,
    }),
    { sameSite: "lax" }
  );

  return {
    headers: newHeaders,
    rows: newRows,
  };
}
