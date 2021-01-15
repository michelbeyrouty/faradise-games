module.exports = {

  friendlyName: 'get',
  description:  'get general score',

  inputs: {
    domainId: {
      type:     'string',
      required: true,
    },
  },

  exits: {
    domainNotFound: { responseType: 'domainNotFound' },
    serverError:    { responseType: 'serverError' },
    success:        { description: 'ok' },
  },

  fn: async function (inputs, exits) {
    try {

      const { generalScoresMap = {} } = await sails.helpers.models.firebase.domain.getById.with({
        domainId: inputs.domainId,
      });

      exits.success({
        generalScoresMap,
      });

    } catch (error) {
      switch (_.get(error, 'raw.code') || _.get(error, 'code'))  {

        case 'domainNotFound':
          exits.domainNotFound();
          break;

        default:
          exits.serverError(error);
      }
    } finally {

      return exits;
    }
  },
};

