const HTTP_EXITS = require('../api/constants/http-exits');

module.exports.custom = {

  FIREBASE_EXITS: {
    USER_NOT_FOUND:     'auth/user-not-found',
    AUTH_TOKEN_EXPIRED: 'auth/id-token-expired',
    INVALID_AUTH_TOKEN: 'auth/argument-error',
  },

  GAME_APPROVAL_STATUS: {
    PENDING: 'PENDING',
  },

  HTTP_EXITS,

  GAME_TYPES: {
    CHESS:         'chess',
    CATAN_CLASSIC: 'catan_classic',
  },

};
