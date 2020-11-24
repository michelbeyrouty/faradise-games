const FIREBASE_EXITS = sails.config.custom.FIREBASE_EXITS;

module.exports = _authenticate;

/**
 * _authenticate
 *
 * @param {object} request
 * @param {object} response
 * @param {function} next
 *
 * @throws invalidAuthToken
 *
 * @returns next
 */
async function _authenticate (request, response, next) {

  try {

    const header = _.get(request, 'headers.authorization');
    const idToken = _fetchIdToken({ header });
    const userId = await _fetchPlayerId({ idToken });
    const user = await sails.helpers.models.user.getById.with({ userId });

    // SUCCESS
    request.user = user;

    return next();

  } catch (error) {

    switch (_.get(error, 'code')) {

      case FIREBASE_EXITS.INVALID_AUTH_TOKEN:
        response.invalidAuthToken();
        break;

      case FIREBASE_EXITS.AUTH_TOKEN_EXPIRED:
        response.authTokenExpired();
        break;

      case 'userNotFound':
        response.userNotFound();
        break;

      case 'invalidAuthHeader':
        response.invalidAuthHeader();
        break;

      case 'moduleNotFound':
        response.moduleNotFound();
        break;

      default:
        response.serverError(error);
    }
    return response;
  }
}


/**
 * _fetchPlayerId
 *
 * @param {object} inputs
 * @param {string} inputs.idToken
 *
 */
async function _fetchPlayerId ({ idToken }) {

  const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
  const playerId = decodedToken.uid;

  return playerId;
}


/**
 * _fetchIdToken
 *
 * @param {object} inputs
 * @param {string} inputs.header
 *
 */
function _fetchIdToken ({ header = '' }) {

  const isBearer = (header.split(' ')[0] === 'Bearer');

  if (!isBearer) {
    throw { code: 'invalidAuthHeader' };
  }

  return header.split(' ')[1];
}
