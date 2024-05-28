import { IsOptional, Matches, Length } from 'class-validator';
import { UpdateUserMessages } from './update-user.messages.js';

export class UpdateUserDto {

  @IsOptional()
  @Matches(/\.(jpe?g|png)$/i, { message: UpdateUserMessages.avatarUrl.invalidFormat})
  public avatarUrl?: string;

  @IsOptional()
  @Length(1, 15, { message: UpdateUserMessages.name.lengthField })
  public name?: string;
}
