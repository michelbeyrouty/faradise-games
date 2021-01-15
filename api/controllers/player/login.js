const passwordHash = require('password-hash');

module.exports = {

  friendlyName: 'login',
  description:  'login',

  inputs: {
    userName: {
      type:     'string',
      required: true,
    },
    password: {
      type:     'string',
      required: true,
    },
  },

  exits: {
    invalidPassword: { responseType: 'invalidPassword' },
    playerNotFound:  { responseType: 'playerNotFound' },
    serverError:     { responseType: 'serverError' },
    success:         { description: 'ok' },
  },

  fn: async function (inputs, exits) {
    try {
      const { userName, password: inputPassword } = inputs;

      const { playerId, passwordHashed } = player = await sails.helpers.models.firebase.player.getById.with({
        playerId: userName,
      });

      _verifyPassword({ inputPassword, passwordHashed });

      // Save {authToken: playerId} pair
      const authToken = await sails.helpers.auth.generateToken.with({ playerId });
      await sails.helpers.models.firebase.authToken.add.with({ authToken, playerId });

      exits.success({
        player,
        authToken,
      });

    } catch (error) {
      switch (_.get(error, 'raw.code') || _.get(error, 'code'))  {

        case 'invalidPassword':
          exits.invalidPassword();
          break;

        case 'playerNotFound':
          exits.playerNotFound();
          break;

        default:
          exits.serverError(error);
      }
    } finally {

      return exits;
    }
  },
};


function _verifyPassword ({ inputPassword, passwordHashed }) {

  if (!passwordHash.verify(inputPassword, passwordHashed)) {
    throw { code: 'invalidPassword' };
  }
}
