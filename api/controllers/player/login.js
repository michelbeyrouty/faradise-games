const passwordHash = require('password-hash');

module.exports = {

  friendlyName: 'player registration',
  description:  'player registration',

  inputs: {
    nickName: {
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
    invalidNickName: { responseType: 'invalidNickName' },
    serverError:     { responseType: 'serverError' },
    success:         { description: 'ok' },
  },

  fn: async function (inputs, exits) {
    try {

      const player = await sails.helpers.models.firebase.player.getByNickName.with(inputs);

      _verifyPassword({
        password:       inputs.password,
        hashedPassword: player.password,
      });

      exits.success({
        player,
      });

    } catch (error) {
      switch (_.get(error, 'raw.code') || _.get(error, 'code'))  {

        case 'invalidPassword':
          exits.invalidPassword();
          break;

        case 'invalidNickName':
          exits.invalidNickName();
          break;

        default:
          exits.serverError(error);
      }
    } finally {

      return exits;
    }
  },
};


function _verifyPassword ({ password, hashedPassword }) {

  if (!passwordHash.verify(password, hashedPassword)) {
    throw { code: 'invalidPassword' };
  }

}
