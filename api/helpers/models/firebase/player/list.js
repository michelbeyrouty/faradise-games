module.exports = {

  friendlyName: 'List players',
  description:  'List players',

  inputs: {
  },

  exits: {
    success: { description: 'gameSession' },
  },

  fn: async function (inputs, exits) {

    const result = await firebaseDb.collection(`${process.env.NODE_ENV}_players`).get();
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
