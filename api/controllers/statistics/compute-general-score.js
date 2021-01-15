module.exports = {

  friendlyName: 'compute',
  description:  'compute general score',

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

      const approvedGameSessionsList = await sails.helpers.models.firebase.gameSession.list.with({
        approvalStatus: 'APPROVED',
      });

      const { generalScoresMap = {} } = await sails.helpers.models.firebase.domain.getById.with({
        domainId: inputs.domainId,
      });

      const Statistics = new sails.classes.Statistics({
        gameSessionsList: approvedGameSessionsList,
        generalScoresMap,
      });
      Statistics.computeGeneralScoresMap();

      await sails.helpers.models.firebase.domain.updateById.with({
        domainId:         inputs.domainId,
        generalScoresMap: Statistics.getGeneralScoresMap(),
      });

      exits.success();

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

