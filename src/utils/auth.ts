import { setAds } from "./../context/index";
import { setAuth, setUsername } from "./../context/auth";
import { setAlert } from "../context/alert";
import { IAlert } from "../types";

export const removeUser = () => {
  localStorage.removeItem("auth");
  setAuth(false);
  setUsername("");
  setAds([]);
};

export const getAuthDataFromLS = () => {
  try {
    const lSData = JSON.parse(localStorage.getItem("auth") as string);

    if (!lSData) {
      removeUser();
      return;
    }

    return lSData;
  } catch (error) {
    removeUser();
  }
};

export const handleAlertMessage = (alert: IAlert) => {
  setAlert(alert);
  setTimeout(() => setAlert({ alertText: "", alertStatus: "" }), 3000);
};
