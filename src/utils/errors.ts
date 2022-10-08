import { IAds } from "./../types/index";
import { setAds, updatedAd } from "./../context/index";
import {
  refreshTokenFx,
  getAdsFx,
  deleteAdFx,
  createAdFx,
  updateAdFx,
} from "./../api/AdsClient";
import { AxiosError } from "axios";
import { IHandleAxiosErrorPayload } from "../types";
import { getAuthDataFromLS, handleAlertMessage, removeUser } from "./auth";

export const handleAxiosError = async (
  error: unknown,
  payload: IHandleAxiosErrorPayload | null = null
) => {
  const errorMessage =
    ((error as AxiosError).response?.data as { message: string }).message ||
    ((error as AxiosError).response?.data as { error: string }).error;

  if (errorMessage) {
    if (errorMessage === "jwt expired") {
      const payloadData = payload as IHandleAxiosErrorPayload;
      const authData = getAuthDataFromLS();

      refreshTokenFx({
        url: "/auth/refresh",
        token: authData.refresh_token,
        username: authData.useename,
      });

      if (payload !== null) {
        switch (payloadData.type) {
          case "get":
            const ads = await getAdsFx({
              url: "/ads",
            });

            setAds(ads);
            break;
          case "create":
            const ad = await createAdFx({
              url: "/ads",
              token: authData.access_token,
              ad: { ...payloadData.createAd?.ad } as IAds,
            });

            if (!ad) {
              return;
            }

            handleAlertMessage({
              alertText: "Успешно добавлено",
              alertStatus: "success",
            });
            setAds(ad);
            break;
          case "update":
            const editedAd = await updateAdFx({
              url: "/ads",
              token: authData.access_token,
              ad: { ...payloadData.updateAd?.ad } as IAds,
              id: payloadData.updateAd?.id as string,
            });

            if (!editedAd) {
              return;
            }

            updatedAd(editedAd);
            break;
          case "delete":
            await deleteAdFx({
              url: "/ads",
              token: authData.access_token,
              id: payloadData.deleteAd?.id as string,
            });
            break;
          default:
            break;
        }
      }
    } else {
      handleAlertMessage({ alertText: errorMessage, alertStatus: "warning" });
      removeUser();
    }
  } else {
    handleAlertMessage({ alertText: errorMessage, alertStatus: "warning" });
  }
};
