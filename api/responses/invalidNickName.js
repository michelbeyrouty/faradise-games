const HTTP_EXITS = sails.config.custom.HTTP_EXITS;

module.exports = function invalidNickName (optionalData = sails.__('responses.invalidNickName')) {

  try {
  // Define the infoCodes for more specific details
    const infoCodes = {
      [HTTP_EXITS.BAD_REQUEST.infoCodes.INVALID_NICK_NAME]: optionalData,
    };

    // Call parent response
    return this.res.badRequest({ infoCodes });

  } catch (error) {
    return this.res.serverError(error);
  }
};
