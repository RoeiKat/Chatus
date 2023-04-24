import { baseUrl } from "../baseUrl";
import { AppDispatch } from "../../store/store";
import { userLogin } from "./user-login";
import { userActions } from "../../store/slices/user.slice";

const URL = `${baseUrl}/user/register`;

interface RegisterInfo {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  color?: string;
}

export const userRegister = function (registerInfo: RegisterInfo) {
  return (dispatch: AppDispatch) => {
    dispatch(userActions.setLoading(true));
    const postToServ = fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ ...registerInfo }),
    });
    postToServ
      .then((results) => {
        if (!results.ok) {
          return results.json().then((foundError) => {
            throw new Error(foundError.message);
          });
        }
        dispatch(
          userLogin({
            email: registerInfo.email,
            password: registerInfo.password,
          })
        );
      })
      .catch((error) => {
        dispatch(userActions.setLoading(false));
        console.log(error);
      });
  };
};
