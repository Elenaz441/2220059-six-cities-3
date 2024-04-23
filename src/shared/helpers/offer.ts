import { Offer, UserType, HouseingType, Good, City } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    city,
    preview,
    images,
    isPremium,
    housingType,
    bedrooms,
    maxAdults,
    price,
    goods,
    name,
    email,
    avatarUrl,
    password,
    type,
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    name,
    email,
    avatarUrl,
    password,
    type: type as UserType,
  };

  return {
    title,
    description,
    city: city as City,
    previewImage: preview,
    images: images.split(';'),
    isPremium: Boolean(isPremium),
    isFavourites: false,
    rating: 0,
    type: housingType as HouseingType,
    bedrooms: Number.parseInt(bedrooms, 10),
    maxAdults: Number.parseInt(maxAdults, 10),
    price: Number.parseFloat(price),
    goods: goods.split(';')
      .map((good) => good as Good),
    host: user,
    commentsCount: 0,
    location: [
      Number.parseFloat(coordinates.split(';')[0]),
      Number.parseFloat(coordinates.split(';')[1])
    ]
  };
}
