export interface IAlert {
  alertText: string;
  alertStatus: string;
}

export interface IAlertProps {
  props: IAlert;
}

export interface ISpinnerProps {
  top: number;
  left: number;
}

export interface IAds {
  title: string;
  price: number;
  description: string;
  date: Date | string;
  _id?: number | string;
  year: string;
  drive: string;
  transmission: string;
  modification: string;
  mileage: string;
  body: string;
  status: string;
  attachment?: FileList | any[] | null;
}

export interface IBaseEffectArgs {
  url: string;
}

export interface IGetAd extends IBaseEffectArgs {
  id: string | number;
}

export interface ICreateAd extends IBaseEffectArgs {
  ad: IAds;
  token: string;
}

export interface IFilterAds extends IBaseEffectArgs {
  data?: {
    title?: string;
    drive?: string;
    transmission?: string;
    priceFrom?: number | string;
    priceTo?: number | string;
    yearFrom?: number | string;
    yearTo?: number | string;
    body?: string;
    status?: string;
    mileageFrom?: number | string;
    mileageTo?: number | string;
  };
}

export interface IUpdateAd extends IBaseEffectArgs {
  ad: IAds;
  id: string | number;
  token: string;
}

export interface IDeleteAd extends IBaseEffectArgs {
  id: string | number;
  token: string;
}

export interface IRefreshToken extends IBaseEffectArgs {
  username: string;
  token: string;
}

export interface IHandleAxiosErrorPayload {
  type: string;
  createAd?: Partial<ICreateAd>;
  getAds?: Partial<IBaseEffectArgs>;
  deleteAd?: Partial<IDeleteAd>;
  updateAd?: Partial<IUpdateAd>;
}

export interface IAdsItemProps {
  ad: IAds;
  index: number;
}

export interface IAdItemProps {
  ad: IAds;
}
