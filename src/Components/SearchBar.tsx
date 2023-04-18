import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Button } from "react-bootstrap";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const SearchBar = function () {
  const submitHandler = function (e: React.FormEvent) {
    e.preventDefault();
    console.log("got here");
  };
  return (
    <Form
      className="d-flex form-control text-light"
      onSubmit={submitHandler}
      style={{ borderRadius: "58px", background: "#333138" }}
    >
      <span className="mx-1 opacity-75">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </span>
      <input
        type="text"
        className="mx-1 text-light"
        style={{ background: "#333138", outline: "none", border: "none" }}
      />
    </Form>
  );
};
