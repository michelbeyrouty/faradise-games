const passwordHash = require('password-hash');

module.exports = {

  friendlyName: 'update',
  description:  'update player details',

  inputs: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    phoneNumber: {
      type: 'number',
    },
    email: {
      type: 'string',
    },
    dateOfBirthTimeStamp: {
      type: 'number',
    },
  },

  exits: {
    playerNotFound: { responseType: 'playerNotFound' },
    serverError:    { responseType: 'serverError' },
    success:        { description: 'ok' },
  },

  fn: async function (inputs, exits) {
    try {

      const { playerId } = this.req.player;
      inputs.playerId = playerId;

      if (inputs.password) {
        inputs.password = passwordHash.generate(inputs.password);
      }

      const player = await sails.helpers.models.firebase.player.updateById.with(inputs);

      exits.success({
        player,
      });

    } catch (error) {
      switch (_.get(error, 'raw.code') || _.get(error, 'code'))  {

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

