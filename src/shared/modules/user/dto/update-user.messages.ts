export const UpdateUserMessages = {
  name: {
    lengthField: 'min length is 1, max is 15',
  },
  avatarUrl: {
    invalidFormat: 'user avatar must be in format jpg or png'
  },
} as const;
