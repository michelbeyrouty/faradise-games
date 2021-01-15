module.exports = {

  friendlyName: 'List',
  description:  'List game session',

  inputs: {
    approvalStatus: {
      type:     'string',
      required: true,
    },
  },

  exits: {
    success: { description: 'gameSessionsList' },
  },

  fn: async function (inputs, exits) {

    const result = await firebaseDb.collection(`${process.env.NODE_ENV}_gameSessions`).get();
    const { gameSessionsList } = _mapResult(result);
    const gameSessionsListToReturn = _filterList(gameSessionsList, inputs.approvalStatus);

    return exits.success(gameSessionsListToReturn);
  },
};


/**
   * _mapResult
   *
   * @param {json} result
   *
   */
function _mapResult (result) {

  const gameSessionsList = [];

  result.forEach(gameSession => {
    gameSessionsList.push({
      ...gameSession.data(),
      gameSessionId: gameSession.id,
    });
  });

  return { gameSessionsList };
}


/**
 * _filterList
 *
 * @param {array} gameSessionsList
 */
function _filterList (gameSessionsList, approvalStatus) {

  return gameSessionsList.filter((gameSession) => {
    return gameSession.approvalStatus === approvalStatus;
  });
}
