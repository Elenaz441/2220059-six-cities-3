import { Offer, UserType, HouseingType, Convenience } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    publicationDate,
    city,
    preview,
    photos,
    isPremium,
    isFavourites,
    rank,
    housingType,
    roomsCount,
    guestsCount,
    price,
    conveniences,
    name,
    email,
    avatarPath,
    password,
    type,
    commentsCount,
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    name,
    email,
    avatarPath,
    password,
    type: type as UserType,
  };

  return {
    title,
    description,
    publicationDate: new Date(publicationDate),
    city,
    preview,
    photos: photos.split(';'),
    isPremium: Boolean(isPremium),
    isFavourites: Boolean(isFavourites),
    rank: Number.parseFloat(rank),
    housingType: housingType as HouseingType,
    roomsCount: Number.parseInt(roomsCount, 10),
    guestsCount: Number.parseInt(guestsCount, 10),
    price: Number.parseFloat(price),
    conveniences: conveniences.split(';')
      .map((convenience) => convenience as Convenience),
    creator: user,
    commentsCount: Number.parseInt(commentsCount, 10),
    coordinates: [Number.parseFloat(coordinates.split(';')[0]),
      Number.parseFloat(coordinates.split(';')[1])]
  };
}
