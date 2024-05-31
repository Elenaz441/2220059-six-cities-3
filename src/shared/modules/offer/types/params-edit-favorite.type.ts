import { ParamsDictionary } from 'express-serve-static-core';

export type ParamsEditFavorite = {
  offerId: string;
  status: string;
} | ParamsDictionary;
