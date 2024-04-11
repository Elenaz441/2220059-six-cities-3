import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_COUNT, PREMIUM_OFFER_COUNT } from './offer.constant.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.RentOfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate('creatorId')
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find()
      .limit(limit)
      .populate('creatorId')
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate('creatorId')
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentsCount: 1,
      }}).exec();
  }

  public async updateRank(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const newRank = await this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            pipeline: [
              { $match: { offerId: offerId } },
              { $group: {
                _id: null,
                avg: { '$avg': '$rank' }}
              }
            ],
            as: 'avg'
          },
        },
      ]).exec();
    return this.offerModel
      .findByIdAndUpdate(offerId, {rank: newRank[0].avg}, {new: true})
      .populate('creatorId')
      .exec();

  }

  public async findPremium(city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ city: city, isPremium: true })
      .sort({ createdAt: SortType.Down })
      .limit(PREMIUM_OFFER_COUNT)
      .populate('creatorId')
      .exec();
  }

  public async findFavourite(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ isFavourites: true })
      .populate('creatorId')
      .exec();
  }

  public async addOfferToFavourite(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {isFavourites: true}, {new: true})
      .populate('creatorId')
      .exec();
  }

  public async deleteOfferFromFavourite(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {isFavourites: false}, {new: true})
      .populate('creatorId')
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }
}
