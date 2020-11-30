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
    serverError: { responseType: 'serverError' },
    success:     { description: 'ok' },
  },

  fn: async function (inputs, exits) {
    try {
      inputs.password = passwordHash.generate(inputs.password);

      const player = await sails.helpers.models.firebase.player.add.with(inputs);

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

