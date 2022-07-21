import { NextPageContext } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import ResourceMain from "../components/Resource/Main";
import StudentList from "../components/Student/List";
import Student from "../components/Student/Student";
import useCookies from "../hooks/useCookies";
import { AuthenticationClient } from "../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../lib/Constants";
import getNotebooks from "../lib/getNotebooks";
import getSections from "../lib/getSections";
import getTemplates from "../lib/getTemplates";
import { parseOneNoteResponse } from "../lib/parsing";

export default function ViewStudentPages(props: any) {
  const { activeCookie, setCookieData, getCookieByKey } = useCookies("student");
  const [templates, setTemplates] = useState<any>([]);
  const [templateContent, setTemplateContent] = useState<any>();

  const handleChange = async (
    e: ChangeEvent<HTMLSelectElement>,
    test: string
  ) => {
    setTemplateContent(undefined);
    setTemplates([]);
    const student = props.students.find(
      (student: any) => student.displayName === e.target.value
    );

    const request = await fetch(
      `http://localhost:3000/api/get-all-pages?userSelector=${student.userSelector}`
    );
    const response = await request.json();

    if (response.pagesUrl) {
      const pageId = response.pagesUrl.substring(
        response.pagesUrl.indexOf("onenote")
      );
      const pageContent = await fetch(
        `http://localhost:3000/api/get-all-pages?resource=${pageId}&userSelector=${student.userSelector}`
      );
      const pageResponse = await pageContent.json();

      if (pageResponse.length !== 0) setTemplates(pageResponse);
    }

    setCookieData(student);
  };

  const customOnClick = async (cookie: any) => {
    const getCookie = getCookieByKey(cookie);

    if (getCookie) {
      const pageContentUserSelector = getCookie.contentUrl.substring(
        getCookie.contentUrl.indexOf("users"),
        getCookie.contentUrl.indexOf("onenote")
      );

      const pageContent = await fetch(
        `http://localhost:3000/api/get-page-content?resource=${
          getCookie.contentUrl.substring(
            getCookie.contentUrl.indexOf("onenote")
          ) + "?includeIDs=true"
        }&userSelector=${pageContentUserSelector}&pageId=${"none"}`
      );
      const pageContentResponse = await pageContent.json();
      if (pageContentResponse.props.htmlContent) {
        const parsed: any = parseOneNoteResponse(
          pageContentResponse.props.htmlContent
        );

        if (parsed.id) {
          setTemplateContent(parsed);
        }
      }
    }
  };

  useEffect(() => {
    async function getTemplates() {
      const student = props.students[0];

      const request = await fetch(
        `http://localhost:3000/api/get-all-pages?userSelector=${student.userSelector}`
      );
      const response = await request.json();

      if (response.pagesUrl) {
        const pageId = response.pagesUrl.substring(
          response.pagesUrl.indexOf("onenote")
        );
        const pageContent = await fetch(
          `http://localhost:3000/api/get-all-pages?resource=${pageId}&userSelector=${student.userSelector}`
        );
        const pageResponse = await pageContent.json();

        if (pageResponse.length !== 0) setTemplates(pageResponse);
      }
    }

    getTemplates();
  }, [props]);
  return (
    <div className="container mx-auto w-3/4">
      <div className="w-1/2 text-center mx-auto my-5">
        <div className="text-xl">Select a student</div>
        <select name="students" onChange={(e) => handleChange(e, "test")}>
          {props.students.map((student: any) => {
            return <Student key={student.id} student={student} />;
          })}
        </select>
      </div>

      {templates.length !== 0 ? (
        <>
          <ResourceMain
            customOnClick={customOnClick}
            resource={templates}
            cookieKey="studentTemplate"
            tableCookieKey="studentTemplate"
            headers={["Template Name", "Link to Template", "Creation Date"]}
          />
        </>
      ) : (
        <div className="text-2xl text-center">
          Loading this student{"'"}s trainings, one moment please.
        </div>
      )}

      <div className="my-10">
        {templateContent && (
          <>
            <div className="text-2xl w-1/2 mx-auto text-center my-10">
              Here is a preview of their training list
            </div>
            <ResourceMain
              hintEnabled={false}
              resource={templateContent.rows}
              cookieKey="studentTemplatePage"
              tableCookieKey="studentTemplatePage"
              headers={templateContent.headers}
            />
          </>
        )}
      </div>
    </div>
  );
}

/**
 * @ignore
 */

// Retrieve list of users within AD as well as
export async function getServerSideProps(context: NextPageContext) {
  const notebooks = await getNotebooks(context);
  //const sections = await getSections(context);
  //const templates = await getTemplates(context, )
  const students: any = {
    props: {},
  };

  const client = AuthenticationClient.init(AUTH_CONFIG);
  const clientApi = await client.api({ context, userSelector: "/users" });
  const response = await clientApi.executeRequest({ shouldReturnProps: false });

  // validate response
  if (response.error) {
    students.props = {
      error: response.error,
      students: [],
    };
  }

  if (response.value) {
    const newStudents = response.value.map((student: any) => {
      return {
        ...student,
        userSelector: `users/${student.id}`,
      };
    });

    students.props = {
      error: false,
      students: newStudents,
    };
  }

  return students;
}
