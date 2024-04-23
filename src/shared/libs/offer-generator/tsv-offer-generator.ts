import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, UserType, HouseingType, Good } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 8;

const MIN_GUESTS_COUNT = 1;
const MAX_GUESTS_COUNT = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const [city, location] = getRandomItem<string>(this.mockData.cities).split(' ');
    const preview = getRandomItem<string>(this.mockData.previews);
    const photos = getRandomItem<string>(this.mockData.photos);
    const isPremium = getRandomItem([0, 1]);
    const housingType = getRandomItem(Object.values(HouseingType));
    const roomsCount = generateRandomValue(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT).toString();
    const guestsCount = generateRandomValue(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const goods = getRandomItems(Object.values(Good)).join(';');
    const name = getRandomItem(this.mockData.names);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatarPaths);
    const password = getRandomItem<string>(this.mockData.passwords);
    const type = getRandomItem([UserType.Regular, UserType.Pro]);

    return [
      title, description, city, preview,
      photos, isPremium, housingType,
      roomsCount, guestsCount, price, goods, name,
      email, avatar, password, type, location
    ].join('\t');
  }
}
