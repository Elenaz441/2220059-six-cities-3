import { UserService } from './user-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DEFAULT_AVATAR_FILE_NAME } from './user.constant.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity({ ...dto, avatarUrl: DEFAULT_AVATAR_FILE_NAME });
    user.setPassword(dto.password, salt);


    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(id).exec();
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, { new: true })
      .exec();
  }

  public async addToFavorite(userId: string, offerId: string): Promise<string[] | null> {
    const user = await this.findById(userId);
    if (user) {
      const favorites = user.favorites;
      favorites.push(offerId);
      await this.userModel.findByIdAndUpdate(userId, {favorites: favorites}).exec();
      return favorites;
    }
    return null;
  }

  public async delFromFavorite(userId: string, offerId: string): Promise<string[] | null> {
    const user = await this.findById(userId);
    if (user) {
      const favorites = user.favorites.filter((favorite) => favorite !== offerId);
      await this.userModel.findByIdAndUpdate(userId, {favorites: favorites}).exec();
      return favorites;
    }
    return null;
  }
}
