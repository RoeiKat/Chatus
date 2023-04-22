import { useState, useEffect } from "react";
import { searchUsers } from "../../API/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { focusContainer, deFocusContainer } from "../../util/focus-container";
import { User } from "../../Interface/user.interface";
import { Spinner } from "react-bootstrap";

export const SearchBar = function (props: {
  setResults: (users: User[]) => void;
  query: string;
  setQuery: (str: string) => void;
  searchResults: User[] | null;
}) {
  const { setResults, query, setQuery, searchResults } = props;
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (query && !searchResults) {
      setLoading(true);
      const timer = setTimeout(() => {
        searchUsers(query)
          .then((results) => {
            setResults(results.users);
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setLoading(false);
          });
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [query, setResults, searchResults]);

  return (
    <div
      style={{ marginBottom: "5px" }}
      id="searchbar"
      className="d-flex form-control text-light input-container"
    >
      <span className="mx-1 opacity-50">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </span>
      <input
        type="text"
        style={{ marginTop: "3px" }}
        value={query}
        autoComplete="off"
        className="mx-1 text-light col-10 col-sm-5 col-md-7 col-lg-9 "
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        onFocus={() => focusContainer("searchbar")}
        onBlur={() => deFocusContainer("searchbar")}
      />

      {loading ? (
        <div>
          <Spinner
            variant="primary"
            style={{
              width: "18px",
              height: "18px",
              marginTop: "4px",
              fontSize: "12px",
              marginLeft: "8px",
            }}
          />
        </div>
      ) : null}
    </div>
  );
};
