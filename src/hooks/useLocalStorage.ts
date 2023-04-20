import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { userActions } from "../store/slices/user.slice";

export const useLocalStorage = function () {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const storage = {
      expiryDate: localStorage.getItem("expiryDate"),
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
    };
    if (!storage.expiryDate && !storage.userId && !storage.token) {
      return;
    } else if (!storage.expiryDate && !storage.userId && !storage.token) {
      console.log("Invalid storage props");
      dispatch(userActions.logout());
    } else {
      dispatch(userActions.automaticLogin(storage));
    }
  }, [dispatch]);
};
