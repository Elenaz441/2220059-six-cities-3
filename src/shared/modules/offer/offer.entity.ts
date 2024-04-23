import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { City, Good, HouseingType } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true, type: () => String })
  public title: string;

  @prop({ trim: true, required: true, type: () => String })
  public description: string;

  @prop({
    required: true,
    type: () => String,
    enum: City })
  public city: string;

  @prop({ required: true, type: () => String })
  public previewImage: string;

  @prop({ required: true, type: () => Array<string> })
  public images: string[];

  @prop({ required: true, default: false, type: () => Boolean })
  public isPremium: boolean;

  @prop({ required: true, default: false, type: () => Boolean })
  public isFavourites: boolean;

  @prop({
    required: true,
    default: 0,
    type: () => Number })
  public rating: number;

  @prop({
    type: () => String,
    enum: HouseingType
  })
  public type: HouseingType;

  @prop({ required: true, type: () => Number })
  public bedrooms: number;

  @prop({ required: true, type: () => Number })
  public maxAdults: number;

  @prop({ required: true, type: () => Number })
  public price: number;

  @prop({ required: true, type: () => Array<Good> })
  public goods: Good[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public host: Ref<UserEntity>;

  @prop({ default: 0, type: () => Number })
  public commentsCount: number;

  @prop({ required: true, type: () => Array<number> })
  public location: [number, number];
}

export const OfferModel = getModelForClass(OfferEntity);
