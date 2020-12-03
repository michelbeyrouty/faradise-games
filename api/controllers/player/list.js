module.exports = {

  friendlyName: 'list',
  description:  'list players',

  inputs: {
  },

  exits: {
    serverError: { responseType: 'serverError' },
    success:     { description: 'ok' },
  },

  fn: async function (inputs, exits) {
    try {

      const playersList = await sails.helpers.models.firebase.player.list();

      exits.success({
        playersList,
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

