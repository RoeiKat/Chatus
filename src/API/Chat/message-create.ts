import { baseUrl } from "../baseUrl";

const URL = `${baseUrl}/chat/`;

export const postMessage = function (message: string, to: string) {
  const token = localStorage.getItem("token");
  return fetch(URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "Application/Json",
    },
    body: JSON.stringify({ message, to }),
  });
};
