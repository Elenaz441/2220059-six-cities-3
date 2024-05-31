import { CityServer, Good, HouseingType } from '../../const';
import UserDto from '../user/user.dto';

export default class OfferDto {
  public id!: string;

  public title!: string;

  public description!: string;

  public city!: CityServer;

  public previewImage!: string;

  public images!: string[];

  public isPremium!: boolean;

  public isFavourites!: boolean;

  public bedrooms!: number;

  public maxAdults!: number;

  public createdAt!: string;

  public type!: HouseingType;

  public price!: number;

  public goods!: Good[];

  public host!: UserDto;

  public location!: [number, number];

  public rating!: number;

  public commentsCount!: number;
}
