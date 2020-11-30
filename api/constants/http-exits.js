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
    },
  },

  // //////|
  // 4xx///|
  // //////|

  // BAD_REQUEST
  BAD_REQUEST: {
    statusCode: 400,
    infoCodes:  {
      INVALID_PASSWORD:         400.1,
      INVALID_USER_NAME:        400.2,
      INVALID_PLAYER_ID:        400.3,
      DUPLICATE_PLAYER_IN_GAME: 400.4,
    },
  },

  // UNAUTHORIZED
  UNAUTHORIZED: {
    statusCode: 401,
    infoCodes:  {
      INVALID_AUTH_HEADER: 401.1,
      INVALID_AUTH_TOKEN:  401.2,
    },
  },

  // FORBIDDEN
  FORBIDDEN: {
    statusCode: 403,
    infoCodes:  {
    },
  },

  // NOT_FOUND
  NOT_FOUND: {
    statusCode: 404,
    infoCodes:  {
      PLAYER_NOT_FOUND:       404.1,
      GAME_SESSION_NOT_FOUND: 404.2,
      GAME_CONFIG_NOT_FOUND:  404.3,
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
