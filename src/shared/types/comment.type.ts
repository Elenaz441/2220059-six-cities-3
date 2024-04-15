import { Offer } from './offer.type.js';
import { User } from './user.type.js';

export type Comment = {
  text: string;
  publishedAt: Date;
  rank: number;
  author: User;
  offer: Offer;
}
