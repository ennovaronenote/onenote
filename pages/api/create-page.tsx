import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticationClient } from "../../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../../lib/Constants";
import { parse } from "node-html-parser";
import { parseOneNoteResponse } from "../../lib/parsing";
import { setCookie } from "cookies-next";

export default async function createPage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") return res.status(400).json({});
    if (Object.keys(req.body).length === 0)
      return res.status(400).json({ fail: true });

    const client = AuthenticationClient.init(AUTH_CONFIG);
    const section: any = { id: undefined };
    const page: any = { id: undefined };

    if (!req.query.userSelector) {
      try {
        const parsedCookies = req.cookies;
        const sectionCookie = parsedCookies.section;
        const pageCookie: string = parsedCookies.page || "";

        if (!sectionCookie) {
          return res.status(400).json({
            error: true,
            message:
              "You need to at least select a section before you can create a page.",
          });
        }

        if (!pageCookie) {
          return (
            !sectionCookie &&
            res.status(400).json({
              error: true,
              message:
                "You need to at least select a section before you can create a page.",
            })
          );
        }

        const parsedSection = JSON.parse(sectionCookie);
        const parsedPage = JSON.parse(pageCookie);
        section.id = parsedSection.id || undefined;
        page.id = parsedPage.id || undefined;
        page.title = parsedPage.displayName || undefined;
      } catch (e) {
        console.error(
          `An error has occured in /api/create-page: ${JSON.stringify(e)}`
        );
      }
    }

    const requestConfig: any = {
      context: { req, res },
      resource: `onenote/pages/${page.id}/content?includeIDs=true`,
    };

    if (req.query.pageId) {
      requestConfig[
        "resource"
      ] = `onenote/pages/${req.query.pageId}/content?includeIDs=true`;
      requestConfig["userSelector"] = req.query.userSelector;
    }

    const executeRequestConfig = {
      method: "PATCH",
      contentType: "application/json",
      body: JSON.stringify(req.body),
      shouldReturnHtml: true,
    };

    const request = await client.api(requestConfig);
    const pageContent = await request.executeRequest(executeRequestConfig);

    if (pageContent.contentUrl) {
      requestConfig["resource"] = `${pageContent.contentUrl}?includeIDs=true`;
    }

    if (req.body.html) {
      requestConfig["resource"] = `onenote/sections/${section.id}/pages`;
      executeRequestConfig["method"] = "POST";
      executeRequestConfig["contentType"] = "text/html";
      executeRequestConfig["body"] = req.body.html;
      executeRequestConfig["shouldReturnHtml"] = false;
    }

    if (pageContent && req.query.pageId) {
      return res.status(200).json({
        success: true,
        userSelector: requestConfig["userSelector"],
        resource: requestConfig["resource"],
      });
    }

    if (!pageContent.htmlContent && !req.body.html) {
      const newPageContentConfig = {
        method: "GET",
        contentType: "text/html",
        shouldReturnHtml: true,
        shouldReturnProps: false,
      };

      const newPageRequest = await client.api(requestConfig);
      const newPageContent = await newPageRequest.executeRequest(
        newPageContentConfig
      );

      const parseNewPage = parseOneNoteResponse(
        newPageContent.props.htmlContent
      );
      const indexOfPages = requestConfig.resource.indexOf("pages/");

      let pageId = requestConfig.resource.substring(
        indexOfPages + "pages/".length
      );
      pageId = pageId.substring(0, pageId.indexOf("/"));

      console.log(parseNewPage);
      setCookie(
        "page",
        JSON.stringify({
          ...parseNewPage,
          id: pageId,
        }),
        {
          req,
          res,
          sameSite: "lax",
        }
      );
      return res.status(200).json(parseNewPage);
    }

    if (req.body.html) {
      const newPageContentConfig = {
        method: "POST",
        contentType: "text/html",
        body: req.body.html,
        shouldReturnHtml: false,
        shouldReturnProps: false,
      };

      const newPageReq = await client.api(requestConfig);
      const newPageData = await newPageReq.executeRequest(newPageContentConfig);

      if (newPageData.contentUrl) {
        let getResource = newPageData.contentUrl;
        getResource =
          getResource.substring(getResource.indexOf("onenote")) +
          "?includeIDs=true";

        requestConfig["resource"] = getResource;
        const newPageRequestConfig = {
          body: undefined,
          shouldReturnProps: false,
          method: "GET",
          contentType: "text/html",
          shouldReturnHtml: true,
        };

        const newPageRequest = await client.api(requestConfig);
        const newPageResponse = await newPageRequest.executeRequest(
          newPageRequestConfig
        );

        const parseNewPage = parseOneNoteResponse(
          newPageResponse.props.htmlContent
        );

        return res.status(200).json(parseNewPage);
      }
    }

    return res.status(200).json(pageContent);
  } catch (error) {
    console.error(`Error has occurred when creating a page: ${error}`);
    return res.status(400).json(error);
  }
}
