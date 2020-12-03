module.exports = {

  friendlyName: 'Add gameSession',
  description:  'Add gameSession',

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
    const { pendingGameSessionsList = [] } = player.data();
    pendingGameSessionsList.push(inputs.gameSessionId);

    await playerRef.update({ pendingGameSessionsList });

    return exits.success();
  },

};

