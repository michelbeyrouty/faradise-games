module.exports = {

  friendlyName: 'Get gameSession by gameSessionAlphaCode',
  description:  'Get gameSession by gameSessionAlphaCode',

  inputs: {
    playerId: {
      type:     'string',
      required: true,
    },
  },

  exits: {
    invalidNickName: { description: 'invalidNickName' },
    success:         { description: 'gameSession' },
  },

  fn: async function (inputs, exits) {

    const playerRef = firebaseDb.collection('players').doc(inputs.playerId);
    const player = await playerRef.get();

    if (!player.exists) {
      throw { code: 'playerNotFound' };
    }

    return exits.success({
      ...player.data(),
      playerId: player.id,
    });
  },
};
