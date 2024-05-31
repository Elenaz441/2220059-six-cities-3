import { IsMongoId, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { CreateCommentMessages } from './create-comment.messages.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.comment.invalidFormat })
  @Length(5, 1024, { message: CreateCommentMessages.comment.lengthField })
  public comment: string;

  @IsNumber({}, { message: CreateCommentMessages.rating.invalidFormat })
  @Min(1, { message: CreateCommentMessages.rating.minValue })
  @Max(5, { message: CreateCommentMessages.rating.maxValue })
  public rating: number;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId: string;

  @IsOptional()
  @IsMongoId({ message: CreateCommentMessages.userId.invalidFormat })
  public userId: string;
}
