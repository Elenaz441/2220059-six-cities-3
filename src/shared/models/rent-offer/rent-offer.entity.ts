import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Convenience, HouseingType } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface RentOfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'rentOffer'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class RentOfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true, type: () => String })
  public title: string;

  @prop({ trim: true, required: true, type: () => String })
  public description: string;

  @prop({ required: true, type: () => String })
  public publicationDate: Date;

  @prop({ required: true, type: () => String })
  public city: string;

  @prop({ required: true, type: () => String })
  public preview: string;

  @prop({ required: true, type: () => Array<string> })
  public photos: string[];

  @prop({ required: true, default: false, type: () => Boolean })
  public isPremium: boolean;

  @prop({ required: true, default: false, type: () => Boolean })
  public isFavourites: boolean;

  @prop({ required: true, type: () => Number })
  public rank: number;

  @prop({
    type: () => String,
    enum: HouseingType
  })
  public housingType: HouseingType;

  @prop({ required: true, type: () => Number })
  public roomsCount: number;

  @prop({ required: true, type: () => Number })
  public guestsCount: number;

  @prop({ required: true, type: () => Number })
  public price: number;

  @prop({ required: true, type: () => Array<Convenience> })
  public conveniences: Convenience[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public creatorId: Ref<UserEntity>;

  @prop({ default: 0, type: () => Number })
  public commentsCount: number;

  @prop({ required: true, type: () => Array<number> })
  public coordinates: [number, number];
}

export const RentOfferModel = getModelForClass(RentOfferEntity);
