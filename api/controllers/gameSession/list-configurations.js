module.exports = {

  friendlyName: 'list',
  description:  'list configurations',

  inputs: {
  },

  exits: {
    serverError: { responseType: 'serverError' },
    success:     { description: 'ok' },
  },

  fn: async function (inputs, exits) {
    try {

      const gameSessionConfigurationsMap = await sails.helpers.models.firebase.gameSessionConfig.list();

      exits.success({
        gameSessionConfigurationsMap,
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

