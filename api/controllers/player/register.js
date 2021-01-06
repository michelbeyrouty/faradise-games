const passwordHash = require('password-hash');

module.exports = {

  friendlyName: 'player registration',
  description:  'player registration',

  inputs: {
    userName: {
      type:     'string',
      required: true,
    },
    password: {
      type:     'string',
      required: true,
    },
    email: {
      type:     'string',
      required: true,
    },
  },

  exits: {
    userNameAlreadyRegistered: { responseType: 'userNameAlreadyRegistered' },
    serverError:               { responseType: 'serverError' },
    success:                   { description: 'ok' },
  },

  fn: async function (inputs, exits) {
    try {
      inputs.passwordHashed = passwordHash.generate(inputs.password);

      const player = await sails.helpers.models.firebase.player.add.with(inputs);

      exits.success({
        player,
      });

    } catch (error) {
      switch (_.get(error, 'raw.code') || _.get(error, 'code'))  {

        case 'userNameAlreadyRegistered':
          const player = _.get(error, 'raw.player') || _.get(error, 'player');
          exits.userNameAlreadyRegistered(player);
          break;

        default:
          exits.serverError(error);
      }
    } finally {

      return exits;
    }
  },
};

