import { Spinner } from "react-bootstrap";
import { useAppSelector } from "../../../store/hooks";

export const FormButton = function (props: { text: string }) {
  const { loading } = useAppSelector((state) => state.user);

  return (
    <div className="col-12 d-flex justify-content-center justify-content-md-start mb-3">
      <button type="submit" className="custom-primary-btn color-change col-8">
        {!loading ? props.text : <Spinner variant="light" />}
      </button>
    </div>
  );
};
