export const FormHeader = function (props: { text: string }) {
  return (
    <h1 className="custom-header">
      {props.text}
      <span className="header-dot">.</span>
    </h1>
  );
};
