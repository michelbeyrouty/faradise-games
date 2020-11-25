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
    const bearerToken = _fetchIdToken({ header });
    const playerId = _fetchPlayerId({ bearerToken });
    const player = await sails.helpers.models.firebase.player.getById.with({ playerId });

    // SUCCESS
    request.player = player;

    return next();

  } catch (error) {

    switch (_.get(error, 'code') || _.get(error, 'raw.code')) {

      case 'playerNotFound':
        response.playerNotFound();
        break;

      case 'invalidAuthHeader':
        response.invalidAuthHeader();
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
 * @param {string} inputs.bearerToken
 *
 */
function _fetchPlayerId ({ bearerToken }) {

  return authCach(bearerToken);
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
