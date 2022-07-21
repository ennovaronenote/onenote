import { getCookie } from "cookies-next";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import ErrorMessage from "../components/Error/Message";
import StudentList from "../components/Student/List";
import { AuthenticationClient } from "../lib/AuthenticationClient";
import { AUTH_CONFIG } from "../lib/Constants";

export default function AddStudent(props: any) {
  const [error, setError] = useState<JSX.Element>();

  useEffect(() => {
    if (props.error) {
      setError(<ErrorMessage error={props.error} />);
    }

    console.log(props);
  }, [props]);

  return error ? (
    error
  ) : (
    <div className="container w-3/4 mx-auto text-center">
      <StudentList students={props.students} />
    </div>
  );
}

/**
 * @ignore
 */

// Retrieve list of users within AD as well as
export async function getServerSideProps(context: NextPageContext) {
  const students: any = {
    props: {},
  };

  const client = AuthenticationClient.init(AUTH_CONFIG);
  const clientApi = await client.api({ context, userSelector: "/users" });
  const response = await clientApi.executeRequest({ shouldReturnProps: false });

  // // Look for list of templates in cookies
  // const templatesCookie: any = getCookie("templates", {
  //   req: context.req,
  //   res: context.res,
  // });

  // let templates: string[] = [];
  // if (templates) {
  //   try {
  //     templates = JSON.parse(templatesCookie.toString());
  //   } catch (e) {
  //     console.error(`There was an issue parsing templates: ${e}`);
  //   }
  // }

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

  // if (templates.length !== 0) {
  //   students.props = {
  //     ...students.props,
  //     templates,
  //   };
  // }

  return students;
}
