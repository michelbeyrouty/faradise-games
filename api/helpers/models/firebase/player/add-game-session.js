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
    success: { description: '' },
  },

  fn: async function (inputs, exits) {

    const playerRef = await firebaseDb.collection(`${process.env.NODE_ENV}_players`).doc(inputs.playerId);

    await playerRef.update({
      pendingGameSession: inputs.gameSessionId,
    });

    return exits.success();
  },

};

