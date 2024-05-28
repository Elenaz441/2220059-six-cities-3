import { City, Good, HouseingType } from '../../../types/index.js';
import {
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsNumber,
  IsArray,
  IsBoolean,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { UpdateOfferValidationMessage } from './update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @IsString({ message: UpdateOfferValidationMessage.title.required })
  @MinLength(10, { message: UpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @IsString({ message: UpdateOfferValidationMessage.description.required })
  @MinLength(20, { message: UpdateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: UpdateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsEnum(City, { message: UpdateOfferValidationMessage.type.invalid })
  public city?: City;

  @IsOptional()
  @IsString({ message: UpdateOfferValidationMessage.previewImage.required })
  @MaxLength(256, { message: UpdateOfferValidationMessage.previewImage.maxLength })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.images.invalidFormat })
  @ArrayMinSize(6, { message: UpdateOfferValidationMessage.images.length })
  @ArrayMaxSize(6, { message: UpdateOfferValidationMessage.images.length })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: UpdateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({ message: UpdateOfferValidationMessage.isFavourites.invalidFormat })
  public isFavourites?: boolean;

  @IsOptional()
  @IsNumber({}, { message: UpdateOfferValidationMessage.rating.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.rating.minValue })
  @Max(5, { message: UpdateOfferValidationMessage.rating.maxValue })
  public rating?: number;

  @IsOptional()
  @IsEnum(HouseingType, { message: UpdateOfferValidationMessage.type.invalid })
  public type?: HouseingType;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: UpdateOfferValidationMessage.bedrooms.maxValue })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message: UpdateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: UpdateOfferValidationMessage.maxAdults.maxValue })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: UpdateOfferValidationMessage.price.minValue })
  @Max(100000, { message: UpdateOfferValidationMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.goods.invalidFormat })
  @IsEnum(Good, { each: true, message: UpdateOfferValidationMessage.goods.invalid })
  public goods?: Good[];

  @IsOptional()
  @IsMongoId({ message: UpdateOfferValidationMessage.host.invalidId })
  public host?: string;

  @IsOptional()
  @IsArray({ message: UpdateOfferValidationMessage.location.invalidFormat })
  @ArrayMinSize(2, { message: UpdateOfferValidationMessage.location.length })
  @ArrayMaxSize(2, { message: UpdateOfferValidationMessage.location.length })
  public location?: [number, number];
}
