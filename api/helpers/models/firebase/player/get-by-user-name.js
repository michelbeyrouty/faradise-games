module.exports = {

  friendlyName: 'Get player',
  description:  'Get player by userName',

  inputs: {
    userName: {
      type:     'string',
      required: true,
    },
  },

  exits: {
    invalidUserName: { description: 'invalidUserName' },
    success:         { description: 'gameSession' },
  },

  fn: async function (inputs, exits) {

    const result = await firebaseDb
      .collection('players')
      .where('userName', '==', inputs.userName)
      .get();

    if (result.empty) {
      throw { code: 'invalidUserName' };
    }

    const { player } = _mapResult({ result });

    return exits.success(player);
  },
};


/**
   * _mapResult
   *
   * @param {json} inputs
   * @param {json} inputs.result
   *
   */
function _mapResult ({ result }) {

  const playersList = [];

  result.forEach(player => {
    playersList.push({
      ...player.data(),
      playerId: player.id,
    });
  });

  return {
    player: playersList[0],
  };

}
