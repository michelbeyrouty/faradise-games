const CRYPTO = require('crypto');

/*
 * helpers/utils/security/encrypt.js
 *
 */
module.exports = {

  friendlyName: 'SHA1-Crypto',
  description:  'Helper crypto to generate encrupted sha1 digests',
  sync:         true,
  inputs:       {
    mix: {
      type:     'string',
      required: true,
    },
    level: {
      type:    'string',
      require: true,
    },
    salt: {
      type:    'string',
      require: true,
    },
  },

  fn: function (inputs, exits) {

    let encryption = '';
    const { mix, level, salt } = inputs;

    try {

      if (!['sha256', 'sha1', 'sha512'].includes(level)) {
        throw new Error(`${level} is not a proper has type`);
      }

      if (inputs.level === 'sha512') {
        encryption = CRYPTO.createHmac(level, salt)
          .update(mix).digest('hex');

      } else {
        encryption = CRYPTO.createHash(level).update(mix).digest('hex');
      }

    } catch (error) {

      return exits.error(error);

    } finally {

      return exits.success(encryption);
    }
  },

};
