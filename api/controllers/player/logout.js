module.exports = {

  friendlyName: 'logout',
  description:  'logout',

  inputs: {
  },

  exits: {
    invalidPlayerId: { responseType: 'invalidPlayerId' },
    serverError:     { responseType: 'serverError' },
    success:         { description: 'ok' },
  },

  fn: async function (inputs, exits) {
    try {

      const { playerId } = this.req.player;

      await sails.helpers.models.firebase.authToken.deleteByPlayerId.with({ playerId });

      exits.success();

    } catch (error) {
      switch (_.get(error, 'raw.code') || _.get(error, 'code'))  {

        case 'invalidPlayerId':
          exits.invalidPlayerId();
          break;

        default:
          exits.serverError(error);
      }
    } finally {

      return exits;
    }
  },
};
