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

    const playerRef = await firebaseDb.collection('players').doc(playerId);
    const player = await playerRef.get();
    const { pendingGameSession = '', approvedGameSessionsList = [] } = player.data();

    if (pendingGameSession === gameSessionId) {
      approvedGameSessionsList.push(gameSessionId);
      await playerRef.update({
        pendingGameSession: '',
        approvedGameSessionsList,
      });
    }

    return exits.success();
  },

};

