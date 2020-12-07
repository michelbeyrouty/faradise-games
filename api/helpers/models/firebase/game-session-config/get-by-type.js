module.exports = {

  friendlyName: 'Get game config',
  description:  'Get game config by type',

  inputs: {
    gameType: {
      type:     'string',
      required: true,
    },
  },

  exits: {
    gameConfigNotFound: { description: 'gameConfigNotFound' },
    success:            { description: 'gameConfig' },
  },

  fn: async function (inputs, exits) {

    const gameConfigRef = firebaseDb.collection(`${process.env.NODE_ENV}_gameSessionConfigs`).doc(inputs.gameType);
    const gameConfig = await gameConfigRef.get();

    if (!gameConfig.exists) {
      throw { code: 'gameConfigNotFound' };
    }

    return exits.success({
      ...gameConfig.data(),
    });
  },
};
