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
    const authToken = _fetchAuthToken({ header });
    const playerId = await _fetchPlayerId({ authToken });
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

      case 'invalidAuthToken':
        response.invalidAuthToken();
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
 * @param {string} inputs.authToken
 *
 */
async function _fetchPlayerId ({ authToken }) {

  const player = await sails.helpers.models.firebase.authToken.getById.with({ authToken });
  return player.playerId;
}


/**
 * _fetchIdToken
 *
 * @param {object} inputs
 * @param {string} inputs.header
 *
 */
function _fetchAuthToken ({ header = '' }) {

  const isBearer = (header.split(' ')[0] === 'Bearer');

  if (!isBearer) {
    throw { code: 'invalidAuthHeader' };
  }

  return header.split(' ')[1];
}
