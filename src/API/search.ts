import { baseUrl } from "./baseUrl";
import { ChatusStorage } from "../Interface/storage.interface";

export const searchUsers = function (query: string) {
  const storage: ChatusStorage = JSON.parse(localStorage.getItem("chatusLS")!);
  return fetch(`${baseUrl}/search?query=${query}`, {
    headers: {
      Authorization: `Bearer ${storage.token}`,
    },
  })
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
