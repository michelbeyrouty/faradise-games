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
    const { pendingGameSessionsList = [], approvedGameSessionsList = [] } = player.data();

    if (pendingGameSessionsList.includes(gameSessionId)) {
      approvedGameSessionsList.push(gameSessionId);
      await playerRef.update({
        pendingGameSessionsList: _.remove(pendingGameSessionsList, gameSessionId),
        approvedGameSessionsList,
      });
    }

    return exits.success();
  },

};

