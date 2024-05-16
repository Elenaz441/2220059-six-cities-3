import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/index.js';
import { OfferRdo } from '../../offer/index.js';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public comment: string;

  @Expose()
  public rating: number;

  @Expose({ name: 'createdAt'})
  public postDate: string;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose({ name: 'offerId'})
  @Type(() => OfferRdo)
  public offer: OfferRdo;
}
