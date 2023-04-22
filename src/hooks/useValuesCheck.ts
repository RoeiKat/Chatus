import { useEffect } from "react";

import { checkTakenEmail, checkTakenUsername } from "../API/User/check-taken";

export const useValuesCheck = function (
  val: string,
  errFunc: (str: string) => void,
  validFunc: (bool: boolean) => void,
  path: "email" | "username"
) {
  useEffect(() => {
    if (val) {
      const timer = setTimeout(() => {
        if (path === "email") {
          checkTakenEmail(val)
            .then((results) => {
              if (results.status === 200) {
                validFunc(true);
              } else if (results.status === 206) {
                return;
              } else {
                errFunc("Email taken, try another");
              }
            })
            .catch((error) => console.log(error));
        } else {
          checkTakenUsername(val)
            .then((results) => {
              if (results.status === 200) {
                validFunc(true);
              } else if (results.status === 206) {
                return;
              } else {
                errFunc("Email taken, try another");
              }
            })
            .catch((error) => console.log(error));
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [val, errFunc, validFunc, path]);
};
