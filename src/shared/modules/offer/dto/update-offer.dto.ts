import { City, Good, HouseingType } from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public city?: City;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public isFavourites?: boolean;
  public rating?: number;
  public type?: HouseingType;
  public bedrooms?: number;
  public maxAdults?: number;
  public price?: number;
  public goods?: Good[];
  public host?: string;
  public location?: [number, number];
}
