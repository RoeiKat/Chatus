import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { userActions } from "../store/slices/user.slice";
import { uiActions } from "../store/slices/ui.slice";
import { ChatusStorage } from "../Interface/storage.interface";

export const useLocalStorage = function () {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const storage: ChatusStorage = JSON.parse(
      localStorage.getItem("chatusLS")!
    );
    if (!storage) {
      dispatch(uiActions.setInitialLoad());
      return;
    } else if (!storage.expiryDate && !storage.userId && !storage.token) {
      console.log("Invalid storage props");
      dispatch(uiActions.setInitialLoad());
      dispatch(userActions.logout());
    } else {
      dispatch(userActions.automaticLogin(storage));
    }
  }, [dispatch]);
};
