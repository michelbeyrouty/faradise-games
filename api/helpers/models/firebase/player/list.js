module.exports = {

  friendlyName: 'List players',
  description:  'List players',

  inputs: {
  },

  exits: {
    invalidUserName: { description: 'invalidUserName' },
    success:         { description: 'gameSession' },
  },

  fn: async function (inputs, exits) {

    const result = await firebaseDb.collection('players').get();
    const { playersList } = _mapResult(result);

    return exits.success(playersList);
  },
};


/**
 * _mapResult
 *
 * @param {json} result
 *
 */
function _mapResult (result) {

  const playersList = [];

  result.forEach(player => {
    playersList.push({
      ...player.data(),
      playerId: player.id,
    });
  });

  return { playersList };
}