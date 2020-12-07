module.exports = {

  friendlyName: 'Get player by playerId',
  description:  'Get player by playerId',

  inputs: {
    playerId: {
      type:     'string',
      required: true,
    },
  },

  exits: {
    playerNotFound: { description: 'playerNotFound' },
    success:        { description: 'gameSession' },
  },

  fn: async function (inputs, exits) {

    const playerRef = firebaseDb.collection(`${process.env.NODE_ENV}_players`).doc(inputs.playerId);
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
