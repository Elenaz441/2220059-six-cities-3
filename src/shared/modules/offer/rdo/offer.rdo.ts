import { Expose, Type } from 'class-transformer';
import { City, Good, HouseingType } from '../../../types/index.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavourites: boolean;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public createdAt: string;

  @Expose()
  public type: HouseingType;

  @Expose()
  public price: number;

  @Expose()
  public goods: Good[];

  @Expose()
  @Type(() => UserRdo)
  public host: string;

  @Expose()
  public location: [number, number];

  @Expose()
  public rating: number;

  @Expose()
  public commentsCount: number;
}
