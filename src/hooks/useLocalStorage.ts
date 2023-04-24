import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { userActions } from "../store/slices/user.slice";
import { uiActions } from "../store/slices/ui.slice";
import { ChatusStorage } from "../Interface/storage.interface";

export const useLocalStorage = function () {
  const dispatch = useAppDispatch();

  const timer = 1500;

  useEffect(() => {
    const delayApplicationLoad = function () {
      setTimeout(() => dispatch(uiActions.setInitialLoad()), timer);
    };
    delayApplicationLoad();
    const storage: ChatusStorage = JSON.parse(
      localStorage.getItem("chatusLS")!
    );
    if (!storage) {
      return;
    } else if (!storage.expiryDate && !storage.userId && !storage.token) {
      dispatch(userActions.logout());
    } else {
      dispatch(userActions.automaticLogin(storage));
    }
  }, [dispatch]);
};
