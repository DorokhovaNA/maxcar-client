import { createDomain } from "effector";
import { IAds } from "../types";

const ads = createDomain();

export const setAds = ads.createEvent<IAds[]>();
export const createAd = ads.createEvent<IAds>();
export const setAd = ads.createEvent<string | number>();
export const updateAd = ads.createEvent<IAds>();
export const removeAd = ads.createEvent<string | number>();
export const updatedAd = ads.createEvent<IAds>();

const handleRemoveAd = (ads: IAds[], id: string | number) =>
  ads.filter((ad) => ad._id !== id);

const handleEditAd = (
  ads: IAds[],
  id: string | number,
  payload: Partial<IAds>
) =>
  ads.map((ad) => {
    if (ad._id === id) {
      return {
        ...ad,
        ...payload,
      };
    }

    return ad;
  });

const handleSetAd = (ads: IAds[], id: string | number) => {
  ads.find((ad) => {
    if (ad._id === id) {
      return ad;
    }
  });
};

export const $ads = ads
  .createStore<IAds[]>([])
  .on(createAd, (state, ad) => [...state, ad])
  .on(setAd, (state, id) => handleSetAd(state, id as string))
  .on(setAds, (_, ads) => ads)
  .on(updatedAd, (state, ad) => [
    ...handleEditAd(state, ad._id as string, {
      title: ad.title,
      price: ad.price,
      description: ad.description,
      year: ad.year,
      drive: ad.drive,
      transmission: ad.transmission,
      modification: ad.modification,
      mileage: ad.mileage,
      body: ad.body,
      status: ad.status,
    }),
  ])
  .on(removeAd, (state, id) => [...handleRemoveAd(state, id)]);
