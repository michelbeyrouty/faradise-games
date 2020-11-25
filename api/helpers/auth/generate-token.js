module.exports = {

  friendlyName: 'Generate Tokens',
  description:  'Authentication layer helper, that generates random auth',

  inputs: {
    playerId: {
      description: 'The ID of the player to generate the tokens to.',
      type:        'string',
      required:    true,
    },
  },

  fn: async function (inputs, exits) {

    let { authToken } = {};

    // Generate tokens
    const randomBytesA = await sails.helpers.utils.security.randomBytes();

    authToken = sails.helpers.utils.security.encrypt.with({
      mix:   `${inputs.playerId}${Date.now()}${process.env.AUTH_SALT}${randomBytesA}`,
      level: 'sha512',
      salt:  process.env.AUTH_SALT,
    });

    return exits.success(authToken);
  },

};
