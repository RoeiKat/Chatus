import { baseUrl } from "../baseUrl";
import { ChatusStorage } from "../../Interface/storage.interface";
const URL = `${baseUrl}/chat/`;

export const postMessage = function (message: string, to: string) {
  const storage: ChatusStorage = JSON.parse(localStorage.getItem("chatusLS")!);
  if (!storage) {
    throw new Error("No storage found");
  } else if (!storage.token) {
    throw new Error("No token found!");
  }
  return fetch(URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${storage.token}`,
      "Content-Type": "Application/Json",
    },
    body: JSON.stringify({ message, to }),
  });
};
