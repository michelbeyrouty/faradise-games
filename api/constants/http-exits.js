module.exports = {

  // OK
  OK: {
    statusCode: 200,
    infoCodes:  {
      SUCCESS_BUT_DUPLICATE: 200.1,
    },
  },

  // CREATED
  CREATED: {
    statusCode: 201,
    infoCodes:  {
    },
  },

  // ALREADY_DONE
  ALREADY_DONE: {
    statusCode: 210,
    infoCodes:  {
      CARD_ALREADY_REGISTERED: 210.1,
    },
  },

  // //////|
  // 4xx///|
  // //////|

  // BAD_REQUEST
  BAD_REQUEST: {
    statusCode: 400,
    infoCodes:  {
      INVALID_AUTH_HEADER:             400.1,
      INVALID_AUTH_TOKEN:              400.2,
      AUTH_TOKEN_EXPIRED:              400.3,
      INVALID_GAME_SESSION_ALPHA_CODE: 400.4,
    },
  },

  // UNAUTHORIZED
  UNAUTHORIZED: {
    statusCode: 401,
    infoCodes:  {
      PLAYER_ALREADY_IN_GAME_SESSION: 401.1,
    },
  },

  // FORBIDDEN
  FORBIDDEN: {
    statusCode: 403,
    infoCodes:  {
      INVALID_AUTH_TOKEN: 403.1,
    },
  },

  // NOT_FOUND
  NOT_FOUND: {
    statusCode: 404,
    infoCodes:  {
      MODULE_NOT_FOUND:       404.1,
      USER_NOT_FOUND:         404.2,
      GAME_SESSION_NOT_FOUND: 404.3,
    },
  },

  // GONE
  GONE: {
    statusCode: 410,
    infoCodes:  {
    },
  },

  // DUPLICATE
  DUPLICATE: {
    statusCode: 452,
    infoCodes:  {
    },
  },


  // ERROR_ALREADY_DONE
  ERROR_ALREADY_DONE: {
    statusCode: 453,
    infoCodes:  {
    },
  },


  // LIMIT_EXCEEDED
  LIMIT_EXCEEDED: {
    statusCode: 460,
    infoCodes:  {
    },
  },

  // //////|
  // 5xx///|
  // //////|

  SERVER_ERROR: { statusCode: 500 },
};
