import { CityServer, HouseingType } from '../../const';

export default class OfferListDto {
  host(host: any): import("../../types/types").User {
    throw new Error('Method not implemented.');
  }
  public id!: string;

  public title!: string;

  public city!: CityServer;

  public previewImage!: string;

  public isPremium!: boolean;

  public isFavourites!: boolean;

  public createdAt!: string;

  public type!: HouseingType;

  public price!: number;

  public rating!: number;

  public commentsCount!: number;
}
