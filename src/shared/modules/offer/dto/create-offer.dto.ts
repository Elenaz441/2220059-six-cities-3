import { Good, HouseingType, City } from '../../../types/index.js';
import { IsArray, IsEnum, IsInt, Max, MaxLength, Min, MinLength, IsBoolean, ArrayMinSize, ArrayMaxSize, IsString, IsOptional, IsMongoId } from 'class-validator';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

export class CreateOfferDto {
  @IsString({ message: CreateOfferValidationMessage.title.required })
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @IsString({ message: CreateOfferValidationMessage.description.required })
  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsEnum(City, { message: CreateOfferValidationMessage.type.invalid })
  public city: City;

  @IsString({ message: CreateOfferValidationMessage.previewImage.required })
  @MaxLength(256, { message: CreateOfferValidationMessage.previewImage.maxLength })
  public previewImage: string;

  @IsOptional()
  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.images.length })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.images.length })
  public images?: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsEnum(HouseingType, { message: CreateOfferValidationMessage.type.invalid })
  public type: HouseingType;

  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.maxValue })
  public bedrooms: number;

  @IsInt({ message: CreateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: CreateOfferValidationMessage.maxAdults.maxValue })
  public maxAdults: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.goods.invalidFormat })
  @IsEnum(Good, { each: true, message: CreateOfferValidationMessage.goods.invalid })
  public goods: Good[];

  @IsMongoId({ message: CreateOfferValidationMessage.host.invalidId })
  public host: string;

  @IsArray({ message: CreateOfferValidationMessage.location.invalidFormat })
  @ArrayMinSize(2, { message: CreateOfferValidationMessage.location.length })
  @ArrayMaxSize(2, { message: CreateOfferValidationMessage.location.length })
  public location: [number, number];
}
