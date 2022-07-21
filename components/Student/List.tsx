import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import useCookies from "../../hooks/useCookies";
import useTemplates from "../../hooks/useTemplates";
import { parseOneNoteRequest } from "../../lib/parsing";
import Student from "./Student";
import TemplateTitle from "./TemplateTitle";

export default function StudentList(props: any) {
  const { activeCookie, setCookieData, getCookieByKey } = useCookies("page");
  const [selections, setSelections] = useState<any>({
    student: {},
    template: {},
  });
  const [updateNecessary, setUpdateNecessary] = useState<boolean>(false);
  const [updateFinished, setUpdateFinished] = useState<boolean>(false);
  const [profileCreated, setProfileCreated] = useState<boolean>(false);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [studentPageLink, setStudentPageLink] = useState<string>("");

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>, array: any[]) => {
    if (!e.target.value) return;

    const foundValue = array.find(
      (value: any) => (value.displayName || value.title) === e.target.value
    );

    return setSelections({
      ...selections,
      [e.target.name]: foundValue,
    });
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInProgress(true);

    const options: any = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selections),
    };

    const request = await fetch(
      "http://localhost:3000/api/create-student-profile",
      options
    );
    const response = await request.json();

    if (response.updateNecessary) {
      setUpdateNecessary(true);
      const studentTableID = response.parsedStudentPage.id;
      let studentHeaders = response.parsedStudentPage.headers;
      studentHeaders = response.parsedTemplatePage.headers;
      let studentRows = response.parsedStudentPage.rows;
      const templateRows = response.parsedTemplatePage.rows;

      studentRows = studentRows.map((row: any) => {
        while (row.length < studentHeaders.length) {
          row.push(templateRows[templateRows.length - 1][row.length]);
        }

        return row;
      });

      const updatedTemplate = parseOneNoteRequest(
        studentHeaders,
        studentRows,
        studentTableID,
        selections.template.title
      );

      const htmlOutput =
        updatedTemplate.querySelector(`[data-id="trainingTable"]`)?.outerHTML ||
        updatedTemplate.outerHTML;

      const createPageBody = {
        target: studentTableID,
        action: "replace",
        content: htmlOutput,
      };

      options["body"] = JSON.stringify([createPageBody]);
      const createPageRequest = await fetch(
        `http://localhost:3000/api/create-page?userSelector=${selections.student.userSelector}&pageId=${response.pageId}`,
        options
      );
      const createPageResponse = await createPageRequest.json();

      if (createPageResponse.success) {
        options["body"] = undefined;
        options["method"] = "GET";
        const getNewPage = await fetch(
          `http://localhost:3000/api/get-page-content?userSelector=${selections.student.userSelector}&pageId=${response.pageId}`,
          options
        );
        const getNewPageResponse = await getNewPage.json();

        if (getNewPageResponse.links) {
          setStudentPageLink(getNewPageResponse.links.oneNoteWebUrl.href);
        }

        setUpdateFinished(true);
      }

      return setUpdateNecessary(false);
    }

    if (response.links) {
      setStudentPageLink(response.links.oneNoteWebUrl.href);
      setProfileCreated(true);
    }

    setInProgress(false);
  };

  useEffect(() => {
    if (props.students.length === 0 || props.templates.length === 0) return;

    setSelections({
      student: {
        ...props.students[0],
      },
      template: {
        ...props.templates[0],
      },
    });
  }, [props]);

  return props.students.length === 0 || props.templates.length === 0 ? (
    <></>
  ) : (
    <div className="w-1/4 my-5 px-10 pt-3 flex flex-col justify-center mx-auto rounded-xl border-2 border-violet-500/75">
      <div className="text-left">Students</div>
      <select
        className="rounded-xl mx-5 my-3 p-2"
        onChange={(e) => handleSelect(e, props.students)}
        name="student"
      >
        {props.students.map((student: any) => {
          return <Student key={student.id} student={student} />;
        })}
      </select>

      <div className="text-left">Templates Available</div>
      <select
        className="rounded-xl mx-5 my-3 p-2"
        onChange={(e) => handleSelect(e, props.templates)}
        name="template"
      >
        {props.templates.map((template: any, index: number) => {
          return <TemplateTitle template={template} key={index} />;
        })}
      </select>

      <button
        className="bg-blue-500 rounded-full text-white m-3 p-1 w-52 mx-auto"
        onClick={handleSubmit}
      >
        {inProgress ? "Working on it" : "Create Student Profile"}
      </button>

      {updateNecessary && (
        <div className="m-3">
          One moment while we update your student{"'"}s table
        </div>
      )}

      {profileCreated && (
        <div className="m-3">
          Profile was created!{" "}
          <a href={studentPageLink} target="_blank" rel="noreferrer">
            Access it here
          </a>
        </div>
      )}

      {updateFinished && (
        <div className="m-3">
          Your student profile was created!{" "}
          <a href={studentPageLink} target="_blank" rel="noreferrer">
            Access it here
          </a>
        </div>
      )}
    </div>
  );
}
