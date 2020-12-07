module.exports = {

  friendlyName: 'Update player by id',
  description:  'Update player by id',

  inputs: {
    gameSessionId: {
      type:     'string',
      required: true,
    },
    approvalsMappedByUserId: {
      type: 'json',
    },
    approvalStatus: {
      type: 'string',
    },
  },

  exits: {
    gameSessionNotFound: { description: 'gameSessionNotFound' },
    success:             { description: 'gameSession' },
  },

  fn: async function (inputs, exits) {

    const { gameSessionId, ...data } = inputs;

    await firebaseDb.collection(`${process.env.NODE_ENV}_gameSessions`).doc(gameSessionId).update(data);
    const gameSession = await firebaseDb.collection(`${process.env.NODE_ENV}_gameSessions`).doc(gameSessionId).get();

    return exits.success({
      ...gameSession.data(),
      gameSessionId: gameSession.id,
    });

  },
};
