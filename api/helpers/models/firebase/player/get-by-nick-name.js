module.exports = {

  friendlyName: 'Get gameSession by gameSessionAlphaCode',
  description:  'Get gameSession by gameSessionAlphaCode',

  inputs: {
    nickName: {
      type:     'string',
      required: true,
    },
  },

  exits: {
    invalidNickName: { description: 'invalidNickName' },
    success:         { description: 'gameSession' },
  },

  fn: async function (inputs, exits) {

    const result = await firebaseDb
      .collection('players')
      .where('nickName', '==', inputs.nickName)
      .get();

    if (result.empty) {
      throw { code: 'invalidNickName' };
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

  result.forEach(gameSession => {
    playersList.push({
      ...gameSession.data(),
      gameSessionId: gameSession.id,
    });
  });

  return {
    player: playersList[0],
  };

}
