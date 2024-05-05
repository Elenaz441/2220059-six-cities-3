export const CreateCommentMessages = {
  comment: {
    invalidFormat: 'comment is required',
    lengthField: 'min length is 5, max is 1024'
  },
  rating: {
    invalidFormat: 'rating must be a number',
    minValue: 'minimum rating is 1',
    maxValue: 'maximum rating is 5',
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id'
  },
  userId: {
    invalidFormat: 'userId field must be a valid id'
  },
} as const;
