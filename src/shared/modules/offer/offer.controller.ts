import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { OfferService } from './offer-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferListRdo } from './rdo/offer-list.rdo.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { CreateOfferRequest } from './type/create-offer-request.type.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/offers', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/offers', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/offers/:offerId', method: HttpMethod.Get, handler: this.show});
    this.addRoute({ path: '/offers/:offerId', method: HttpMethod.Patch, handler: this.update});
    this.addRoute({ path: '/offers/:offerId', method: HttpMethod.Delete, handler: this.delete});
    this.addRoute({ path: '/premium', method: HttpMethod.Get, handler: this.getPremium});
    this.addRoute({ path: '/favorites', method: HttpMethod.Get, handler: this.getFavorites});
    this.addRoute({ path: '/favorites/:offerId', method: HttpMethod.Post, handler: this.addToFavorites});
    this.addRoute({ path: '/favorites/:offerId', method: HttpMethod.Delete, handler: this.delFromFavorites});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferListRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async show(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController',
    );
  }

  public async update(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController',
    );
  }

  public async delete(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController',
    );
  }

  public async getPremium(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController',
    );
  }

  public async getFavorites(_req: Request, res: Response): Promise<void> {
    const favoriteOffers = await this.offerService.findFavourite();
    const responseData = fillDTO(OfferListRdo, favoriteOffers);
    this.ok(res, responseData);
  }

  public async addToFavorites(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController',
    );
  }

  public async delFromFavorites(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController',
    );
  }
}
