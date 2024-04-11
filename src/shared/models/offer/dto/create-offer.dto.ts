import { Convenience, HouseingType } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public publicationDate: Date;
  public city: string;
  public preview: string;
  public photos: string[];
  public isPremium: boolean;
  public isFavourites: boolean;
  public rank: number;
  public housingType: HouseingType;
  public roomsCount: number;
  public guestsCount: number;
  public price: number;
  public conveniences: Convenience[];
  public creatorId: string;
  public commentsCount: number;
  public coordinates: [number, number];
}
