module.exports = {

  friendlyName: 'Get playerId stored with the authToken',
  description:  'Get playerId stored with the authToken',

  inputs: {
    authToken: {
      type:     'string',
      required: true,
    },
  },

  exits: {
    invalidAuthToken: { description: 'invalidAuthToken' },
    success:          { description: 'playerId' },
  },

  fn: async function (inputs, exits) {

    const authTokenRef = firebaseDb.collection('authToken').doc(inputs.authToken);
    const authToken = await authTokenRef.get();

    if (!authToken.exists) {
      throw { code: 'invalidAuthToken' };
    }

    return exits.success({
      ...authToken.data(),
    });
  },
};
