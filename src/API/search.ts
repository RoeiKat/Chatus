import { baseUrl } from "./baseUrl";

export const searchUsers = function (query: string) {
  return fetch(`${baseUrl}/user/search?query=${query}`)
    .then((results) => {
      if (results.status !== 200) {
        return;
      } else {
        return results.json();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
