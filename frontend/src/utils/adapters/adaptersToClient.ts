import { CityLocation, CityServer, UserType } from '../../const';
import CommentDto from '../../dto/comment/comment.dto';
import OfferListDto from '../../dto/offer/offer-list.dto';
import OfferDto from '../../dto/offer/offer.dto';
import UserDto from '../../dto/user/user.dto';
import { City, CityName, Comment, Offer, Type, User } from '../../types/types';

const adaptCityToClient =
  (city: CityServer): City => ({
    name: city as CityName,
    location: {
      latitude: CityLocation[city as CityName].latitude,
      longitude: CityLocation[city as CityName].longitude
    }
  });

export const adaptOffersToClient =
  (offers: OfferListDto[]): Offer[] =>
    offers
      .map((offer: OfferListDto) => ({
        id: offer.id,
        title: offer.title,
        description: '',
        city: adaptCityToClient(offer.city),
        previewImage: offer.previewImage,
        isPremium: offer.isPremium,
        isFavorite: offer.isFavourites,
        type: offer.type as Type,
        price: offer.price,
        rating: offer.rating,
        location: adaptCityToClient(offer.city).location,
        bedrooms: 0,
        goods: [],
        host: {} as User,
        images: [],
        maxAdults: 0
      }));

export const adaptOfferToClient =
  (offer: OfferDto): Offer => ({
    id: offer.id,
    title: offer.title,
    description: offer.description,
    city: adaptCityToClient(offer.city),
    previewImage: offer.previewImage,
    isPremium: offer.isPremium,
    isFavorite: offer.isFavourites,
    type: offer.type as Type,
    price: offer.price,
    rating: offer.rating,
    location: adaptCityToClient(offer.city).location,
    bedrooms: offer.bedrooms,
    goods: offer.goods as string[],
    host: adaptUserToClient(offer.host),
    images: offer.images,
    maxAdults: offer.maxAdults
  });

export const adaptUserToClient =
  (user: UserDto): User => ({
    name: user.name,
    avatarUrl: user.avatarUrl,
    isPro: user.type === UserType.Pro,
    email: user.email,
  });

export const adaptCommentToClient =
  (comment: CommentDto): Comment => ({
    id: comment.id,
    comment: comment.comment,
    date: comment.postDate,
    rating: comment.rating,
    user: adaptUserToClient(comment.user)
  });

export const adaptCommentsToClient =
(comments: CommentDto[]): Comment[] =>
  comments
    .map((comment: CommentDto) => ({
      id: comment.id,
      comment: comment.comment,
      date: comment.postDate,
      rating: comment.rating,
      user: adaptUserToClient(comment.user)
    }));
