const passwordHash = require('password-hash');

module.exports = {

  friendlyName: 'update',
  description:  'update player details',

  inputs: {
    firstName: {
      type:     'string',
      required: true,
    },
    lastName: {
      type:     'string',
      required: true,
    },
    userName: {
      type:     'string',
      required: true,
    },
    phoneNumber: {
      type:     'number',
      required: true,
    },
    email: {
      type:     'string',
      required: true,
    },
    dateOfBirthTimeStamp: {
      type:     'number',
      required: true,
    },
  },

  exits: {
    serverError: { responseType: 'serverError' },
    success:     { description: 'ok' },
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

        default:
          exits.serverError(error);
      }
    } finally {

      return exits;
    }
  },
};

