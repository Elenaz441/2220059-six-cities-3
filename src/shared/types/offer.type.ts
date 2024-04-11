import { HouseingType } from './enums/housing-type.enum.js';
import { Convenience } from './enums/convenience.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  publicationDate: Date;
  city: string;
  preview: string;
  photos: string[];
  isPremium: boolean;
  isFavourites: boolean;
  rank: number;
  housingType: HouseingType;
  roomsCount: number;
  guestsCount: number;
  price: number;
  conveniences: Convenience[];
  creator: User;
  commentsCount: number;
  coordinates: [number, number];
}
