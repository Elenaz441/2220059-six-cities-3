import { Offer } from './offer.type.js';
import { User } from './user.type.js';

export type Comment = {
  comment: string;
  rating: number;
  user: User;
  offer: Offer;
}
