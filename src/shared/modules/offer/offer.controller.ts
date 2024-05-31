import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseController, DocumentExistsMiddleware,
  HttpError, PrivateRouteMiddleware,
  HttpMethod,
  RequestQuery,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferListRdo } from './rdo/offer-list.rdo.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { CreateOfferRequest } from './types/create-offer-request.type.js';
import { ParamOfferId } from './types/param-offerid.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CommentRdo, CommentService } from '../comment/index.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { ParamsEditFavorite } from './types/params-edit-favorite.type.js';
import { UserService } from '../user/user-service.interface.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.UserService) private readonly userService: UserService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/offers', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/offers',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });

    this.addRoute({
      path: '/offers/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });

    this.addRoute({
      path: '/offers/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });

    this.addRoute({
      path: '/offers/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });

    this.addRoute({ path: '/premium', method: HttpMethod.Get, handler: this.getPremium});

    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });

    this.addRoute({
      path: '/favorites/:offerId/:status',
      method: HttpMethod.Post,
      handler: this.editFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });

    this.addRoute({
      path: '/offers/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
  }

  public async index({ query, tokenPayload } : Request<unknown, unknown, unknown, RequestQuery>, res: Response): Promise<void> {
    const offers = await this.offerService.find(query.limit);
    if (tokenPayload) {
      const user = await this.userService.findById(tokenPayload.id);
      if (user){
        offers.map((offer) => {
          if (user.favorites.includes(offer.id)) {
            offer.isFavourites = true;
          }
        });
      }
    }
    const responseData = fillDTO(OfferListRdo, offers);
    this.ok(res, responseData);
  }

  public async create({ body, tokenPayload }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create({ ...body, host: tokenPayload.id });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async show({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    if (tokenPayload) {
      const user = await this.userService.findById(tokenPayload.id);
      if (user && offer && user.favorites.includes(offerId)){
        offer.isFavourites = true;
      }
    }
    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async update({ body, params, tokenPayload }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    if (!tokenPayload) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'User unauthorized.',
        'OfferController'
      );
    }
    const offer = await this.offerService.findById(params.offerId);
    if (offer && tokenPayload.id !== offer.host.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'This user has no rights to update this offer.',
        'OfferController'
      );
    }
    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    const user = await this.userService.findById(tokenPayload.id);
    if (user && updatedOffer && user.favorites.includes(updatedOffer.id)){
      updatedOffer.isFavourites = true;
    }
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async delete({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    if (!tokenPayload) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'User unauthorized.',
        'OfferController'
      );
    }
    const offer = await this.offerService.findById(params.offerId);
    if (offer && tokenPayload.id !== offer.host.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'This user has no rights to delete this offer.',
        'OfferController'
      );
    }
    const { offerId } = params;
    const deletedoffer = await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, deletedoffer);
  }

  public async getPremium({ query, tokenPayload } : Request<unknown, unknown, unknown, RequestQuery>, res: Response): Promise<void> {
    if (!query.city) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'City is not specified.',
        'OfferController'
      );
    }
    const offers = await this.offerService.findPremium(query.city);
    if (tokenPayload) {
      const user = await this.userService.findById(tokenPayload.id);
      if (user){
        offers.map((offer) => {
          if (user.favorites.includes(offer.id)) {
            offer.isFavourites = true;
          }
        });
      }
    }
    const responseData = fillDTO(OfferListRdo, offers);
    this.ok(res, responseData);
  }

  public async getFavorites({ tokenPayload }: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const favoriteOffers: DocumentType<OfferEntity>[] = [];
    if (tokenPayload) {
      const user = await this.userService.findById(tokenPayload.id);
      if (user) {
        for (let i = 0; i < offers.length; i++) {
          if (user.favorites.includes(offers[i].id)) {
            offers[i].isFavourites = true;
            favoriteOffers.push(offers[i]);
          }
        }
      }
    }
    const responseData = fillDTO(OfferListRdo, favoriteOffers);
    this.ok(res, responseData);
  }

  public async editFavorite({ params, tokenPayload }: Request<ParamsEditFavorite>, res: Response): Promise<void> {
    if (tokenPayload) {
      const { offerId, status } = params;
      if (status === '1') {
        await this.userService.addToFavorite(tokenPayload.id, offerId);
      } else {
        await this.userService.delFromFavorite(tokenPayload.id, offerId);
      }
      const offer = await this.offerService.findById(offerId);
      if (offer) {
        offer.isFavourites = Boolean(Number(status));
      }
      this.ok(res, fillDTO(OfferRdo, offer));
    }
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
