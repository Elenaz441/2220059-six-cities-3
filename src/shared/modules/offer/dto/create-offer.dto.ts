import { Good, HouseingType, City } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public city: City;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public type: HouseingType;
  public bedrooms: number;
  public maxAdults: number;
  public price: number;
  public goods: Good[];
  public host: string;
  public location: [number, number];
}
