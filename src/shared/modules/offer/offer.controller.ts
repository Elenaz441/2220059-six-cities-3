import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseController,
  HttpError,
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

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/offers', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/offers',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)]
    });

    this.addRoute({
      path: '/offers/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });

    this.addRoute({
      path: '/offers/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
      ]
    });

    this.addRoute({
      path: '/offers/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });

    this.addRoute({ path: '/premium', method: HttpMethod.Get, handler: this.getPremium});
    this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.getFavorites});

    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.Post,
      handler: this.addToFavorites,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });

    this.addRoute({
      path: '/favorites/:offerId',
      method: HttpMethod.Delete,
      handler: this.delFromFavorites,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });

    this.addRoute({
      path: '/offers/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
  }

  public async index({ query } : Request<unknown, unknown, unknown, RequestQuery>, res: Response): Promise<void> {
    const offers = await this.offerService.find(query.limit);
    const responseData = fillDTO(OfferListRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    if (! offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async update({ body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);

    if (!updatedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  public async getPremium({ query } : Request<unknown, unknown, unknown, RequestQuery>, res: Response): Promise<void> {

    if (!query.city) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'City is not specified.',
        'OfferController'
      );
    }
    const offers = await this.offerService.findPremium(query.city);
    const responseData = fillDTO(OfferListRdo, offers);
    this.ok(res, responseData);
  }

  public async getFavorites(_req: Request, res: Response): Promise<void> {
    const favoriteOffers = await this.offerService.findFavourite();
    const responseData = fillDTO(OfferListRdo, favoriteOffers);
    this.ok(res, responseData);
  }

  public async addToFavorites({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.addOfferToFavourite(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async delFromFavorites({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteOfferFromFavourite(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    if (!await this.offerService.exists(params.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
