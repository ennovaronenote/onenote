export default function Student(props: any) {
  return (
    <option value={props.student.displayName}>
      {props.student.displayName}
    </option>
  );
}
