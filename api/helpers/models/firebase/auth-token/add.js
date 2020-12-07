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

    const authTokenRef = firebaseDb.collection(`${process.env.NODE_ENV}_authTokens`);
    await authTokenRef.doc(inputs.authToken).set({
      playerId: inputs.playerId,
    });

    return exits.success();
  },

};

