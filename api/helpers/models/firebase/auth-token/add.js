module.exports = {

  friendlyName: 'Add {authToken: playerId} pair',
  description:  'Add {authToken: playerId} pair',

  inputs: {
    authToken: {
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

    const authTokensRef = firebaseDb.collection('authToken');
    await authTokensRef.doc(inputs.authToken).set({
      playerId: inputs.playerId,
    });

    return exits.success();
  },

};

