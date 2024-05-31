import { HouseingType } from './enums/housing-type.enum.js';
import { Good } from './enums/good.enum.js';
import { User } from './user.type.js';
import { City } from './enums/city.enum.js';

export type Offer = {
  title: string;
  description: string;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavourites: boolean;
  rating: number;
  type: HouseingType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Good[];
  host: User;
  commentsCount: number;
  location: [number, number];
}
