import { handleAxiosError } from "./../utils/errors";
import { removeUser } from "./../utils/auth";
import {
  ICreateAd,
  IBaseEffectArgs,
  IRefreshToken,
  IDeleteAd,
  IUpdateAd,
  IFilterAds,
  IGetAd,
} from "./../types/index";
import { createEffect } from "effector";
import api from "./axiosClient";

export const createAdFx = createEffect(
  async ({ url, ad, token }: ICreateAd) => {
    const formData = new FormData();

    if (ad.attachment) {
      for (let i = 0; i < ad.attachment.length; i++) {
        formData.append("attachment", ad.attachment[i]);
      }
    }

    formData.append("price", `${ad.price}`);
    formData.append("description", ad.description);
    formData.append("title", ad.title);
    formData.append("year", `${ad.year}`);
    formData.append("drive", ad.drive);
    formData.append("transmission", ad.transmission);
    formData.append("modification", `${ad.modification}`);
    formData.append("mileage", ad.mileage);
    formData.append("status", ad.status);
    formData.append("body", ad.body);
    formData.append("date", new Date().toISOString());

    try {
      const { data } = await api.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (error) {
      handleAxiosError(error, { type: "create", createAd: { ad } });
    }
  }
);

export const updateAdFx = createEffect(
  async ({ url, ad, token, id }: IUpdateAd) => {
    try {
      const { data } = await api.patch(
        `${url}/${id}`,
        { ...ad },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return data;
    } catch (error) {
      handleAxiosError(error, { type: "update", updateAd: { ad, id } });
    }
  }
);

export const getAdsFx = createEffect(async ({ url }: IBaseEffectArgs) => {
  try {
    const { data } = await api.get(url);

    return data;
  } catch (error) {
    handleAxiosError(error, { type: "get" });
  }
});

export const getOneAdFx = createEffect(async ({ url, id }: IGetAd) => {
  try {
    const { data } = await api.get(`${url}/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getAdsFilteredFx = createEffect(
  async ({ url, data }: IFilterAds) => {
    let params = {};
    // @ts-ignore
    const dataEntries: [string, string][] = Object.entries(data);
    for (const [key, value] of dataEntries) {
      if (value) {
        // @ts-ignore
        params[key] = value;
      }
    }

    try {
      const { data } = await api.get(url, { params });

      return data;
    } catch (error) {
      handleAxiosError(error, { type: "get" });
    }
  }
);

export const deleteAdFx = createEffect(
  async ({ url, token, id }: IDeleteAd) => {
    try {
      await api.delete(`${url}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      handleAxiosError(error, { type: "delete", deleteAd: { id } });
    }
  }
);

export const refreshTokenFx = createEffect(
  async ({ url, token, username }: IRefreshToken) => {
    try {
      const result = await api.post(url, { refresh_token: token, username });

      if (result.status === 200) {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...result.data,
            username,
          })
        );

        return result.data.access_token;
      } else {
        removeUser();
      }
    } catch (error) {
      console.log(error);
    }
  }
);
