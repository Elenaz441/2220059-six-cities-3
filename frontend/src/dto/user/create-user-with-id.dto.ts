import { UserType } from '../../const';

export default class CreateUserWithIdDto {
  public id!: string;

  public name!: string;

  public email!: string;

  public password!: string;

  public type!: UserType;
}
