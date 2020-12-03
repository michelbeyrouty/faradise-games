const GAME_APPROVAL_STATUS = sails.config.custom.GAME_APPROVAL_STATUS;

module.exports = {

  friendlyName: 'Add gameSession',
  description:  'Add gameSession',

  inputs: {
    scoresMap: {
      type:     'json',
      required: true,
    },
    gameType: {
      type:     'string',
      required: true,
    },
    playerIdsList: {
      type:     ['string'],
      required: true,
    },
    approvalsMappedByUserId: {
      type:     'json',
      required: true,
    },
  },

  exits: {
    success: { description: 'gameSession' },
  },

  fn: async function (inputs, exits) {

    let gameSession = await firebaseDb.collection('gameSessions').add({
      ...inputs,
      approvalStatus: GAME_APPROVAL_STATUS.PENDING,
    });
    gameSession = await firebaseDb.collection('gameSessions').doc(gameSession.id).get();

    return exits.success({
      ...gameSession.data(),
      gameSessionId: gameSession.id,
    });
  },

};

