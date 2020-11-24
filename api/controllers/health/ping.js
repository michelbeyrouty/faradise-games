module.exports = {

  friendlyName: 'health',
  description:  'health ping',

  inputs: {
  },

  exits: {
    serverError: { responseType: 'serverError' },
    success:     { description: 'ok' },
  },

  fn: function (inputs, exits) {
    try {

      exits.success();

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

