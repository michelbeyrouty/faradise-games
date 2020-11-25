const crypto = require('crypto');

module.exports = {

  friendlyName: 'RandomBytes-Crypto',
  description:  'Helper crypto to generate RandomString digest',

  // crypto.randomBytes() is returning a callback, so this function is async
  // eslint-disable-next-line require-await
  fn: async function (inputs, exits) {
    crypto.randomBytes(48, (err, buffer) => {

      if (err) {
        return exits.error(err);

      } else {
        return exits.success(buffer.toString('hex'));

      }
    });
  },

};
