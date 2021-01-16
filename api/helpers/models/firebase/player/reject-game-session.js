module.exports = {

  friendlyName: 'Approve gameSession',
  description:  'Approve gameSession',

  inputs: {
    gameSessionId: {
      type:     'string',
      required: true,
    },
    playerId: {
      type:     'string',
      required: true,
    },
  },

  exits: {
    success: { description: 'gameSession' },
  },

  fn: async function (inputs, exits) {

    const { gameSessionId, playerId } = inputs;

    const playerRef = await firebaseDb.collection(`${process.env.NODE_ENV}_players`).doc(playerId);
    const player = await playerRef.get();
    const { pendingGameSession = '', rejectedGameSessionsList = [] } = player.data();

    if (pendingGameSession === gameSessionId) {
      rejectedGameSessionsList.push(gameSessionId);
      await playerRef.update({
        pendingGameSession: '',
        rejectedGameSessionsList,
      });
    }

    return exits.success();
  },

};

