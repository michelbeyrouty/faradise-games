module.exports = {

  friendlyName: 'Get gameSession by gameSessionId',
  description:  'Get gameSession by gameSessionId',

  inputs: {
    gameSessionId: {
      type:     'string',
      required: true,
    },
  },

  exits: {
    gameSessionNotFound: { description: 'gameSessionNotFound' },
    success:             { description: 'gameSession' },
  },

  fn: async function (inputs, exits) {

    const gameSessionRef = firebaseDb.collection(`${process.env.NODE_ENV}_gameSessions`).doc(inputs.gameSessionId);
    const gameSession = await gameSessionRef.get();

    if (!gameSession.exists) {
      throw { code: 'gameSessionNotFound' };
    }

    return exits.success({
      ...gameSession.data(),
      gameSessionId: gameSession.id,
    });
  },
};
