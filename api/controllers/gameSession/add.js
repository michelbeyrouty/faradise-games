module.exports = {

  friendlyName: 'Add game session',
  description:  'Add game session',

  inputs: {
  },

  exits: {
    serverError: { responseType: 'serverError' },
    success:     { description: 'ok' },
  },

  fn: function (inputs, exits) {
    try {

      exits.success(this.req.player);

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

