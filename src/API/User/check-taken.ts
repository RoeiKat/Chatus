import { baseUrl } from "../baseUrl";

export const checkTakenEmail = function (email: string) {
  return fetch(`${baseUrl}/user/check-email?email=${email}`)
    .then((results) => {
      if (results.status !== 200) {
        return false;
      } else {
        return true;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const checkTakenUsername = function (username: string) {
  return fetch(`${baseUrl}/user/check-username?username=${username}`)
    .then((results) => {
      if (results.status !== 200) {
        return false;
      } else {
        return true;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
