import { Good, HouseingType, CityServer } from '../../const';

export default class CreateOfferDto {
  public title!: string;

  public description!: string;

  public city!: CityServer;

  public previewImage!: string;

  public images?: string[];

  public isPremium!: boolean;

  public type!: HouseingType;

  public bedrooms!: number;

  public maxAdults!: number;

  public price!: number;

  public goods!: Good[];

  public location!: [number, number];
}
