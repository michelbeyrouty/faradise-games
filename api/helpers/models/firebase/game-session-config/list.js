module.exports = {

  friendlyName: 'List',
  description:  'List game session configurations',

  inputs: {
  },

  exits: {
    success: { description: 'gameSessionConfigurationsMap' },
  },

  fn: async function (inputs, exits) {

    const result = await firebaseDb.collection(`${process.env.NODE_ENV}_gameSessionConfigs`).get();
    const { gameSessionConfigurationsMap } = _mapResult(result);

    return exits.success(gameSessionConfigurationsMap);
  },
};


/**
     * _mapResult
     *
     * @param {json} result
     *
     */
function _mapResult (result) {

  const gameSessionConfigurationsMap = {};

  result.forEach(gameSessionConfig => {
    gameSessionConfigurationsMap[gameSessionConfig.id] = { ...gameSessionConfig.data() };
  });

  return { gameSessionConfigurationsMap };
}
