module.exports = {

  friendlyName: 'Update gameSessionsList',
  description:  'update gameSessionsList to player',

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

    const playerRef = await firebaseDb.collection('players').doc(inputs.playerId);
    const player = await playerRef.get();
    const { gameSessionsList = [] } = player.data();
    gameSessionsList.push(inputs.gameSessionId);

    await playerRef.update({ pendingGameSessionsList: gameSessionsList });

    return exits.success();
  },

};

