import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { User, UserType } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ unique: true, required: true, type: () => String })
  public email: string;

  @prop({ required: true, type: () => String })
  public name: string;

  @prop({ required: false, default: '', type: () => String })
  public avatarUrl: string;

  @prop({
    type: () => String,
    enum: UserType
  })
  public type!: UserType;

  @prop({required: true, default: [], type: () => Array<string>})
  public favorites: string[];

  @prop({ required: true, default: '', type: () => String })
  private password?: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.name = userData.name;
    this.type = userData.type;
    this.avatarUrl = userData.avatarUrl;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
