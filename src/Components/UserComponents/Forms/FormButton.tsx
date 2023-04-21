export const FormButton = function (props: { text: string }) {
  return (
    <div className="col-12 d-flex justify-content-center justify-content-md-start mb-3">
      <button type="submit" className="custom-primary-btn color-change col-8">
        {props.text}
      </button>
    </div>
  );
};
