import { getCookie } from "cookies-next";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import ErrorMessage from "../components/Error/Message";
import StudentList from "../components/Student/List";
import { AuthenticationClient } from "../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../lib/Constants";
import getTemplates from "../lib/getTemplates";

export default function AddStudent(props: any) {
  const [error, setError] = useState<JSX.Element>();

  useEffect(() => {
    if (props.error) {
      setError(<ErrorMessage error={props.error} />);
    }
  }, [props]);

  return error ? (
    error
  ) : (
    <div className="container w-full mx-auto text-center lg:w-3/4">
      <StudentList students={props.students} templates={props.templates} />
    </div>
  );
}

/**
 * @ignore
 */

// Retrieve list of users within AD as well as
export async function getServerSideProps(context: NextPageContext) {
  const templates = await getTemplates(context);
  const students: any = {
    props: {},
  };

  if (templates.error) {
    return {
      redirect: {
        permanent: false,
        destination: "/view-sections",
      },
      props: {},
    };
  }

  const client = AuthenticationClient.init(AUTH_CONFIG);
  const clientApi = await client.api({ context, userSelector: "/users" });
  const response = await clientApi.executeRequest({ shouldReturnProps: false });

  // validate response
  if (response.error) {
    students.props = {
      error: response.error,
      students: [],
      templates: [],
    };

    return {
      redirect: {
        permanent: false,
        destination: "/view-pages",
      },
      props: {},
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

  if (templates.props.value) {
    students.props = {
      ...students.props,
      templates: templates.props.value,
    };
  }

  return students;
}
