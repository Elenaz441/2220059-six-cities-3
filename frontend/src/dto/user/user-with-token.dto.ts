import { UserType } from '../../const';

export default class UserWithTokenDto {
  public email!: string ;

  public avatarUrl!: string;

  public name!: string;

  public type!: UserType;

  public token!: string;
}
