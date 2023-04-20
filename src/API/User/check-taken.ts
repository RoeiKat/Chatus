import { baseUrl } from "../baseUrl";

export const checkTakenEmail = function (email: string) {
  return fetch(`${baseUrl}/user/check-email?email=${email}`);
};

export const checkTakenUsername = function (username: string) {
  return fetch(`${baseUrl}/user/check-username?username=${username}`);
};
