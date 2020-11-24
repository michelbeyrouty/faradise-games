const HTTP_EXITS = sails.config.custom.HTTP_EXITS;

module.exports = function invalidPassword (optionalData = sails.__('responses.invalidPassword')) {

  try {
  // Define the infoCodes for more specific details
    const infoCodes = {
      [HTTP_EXITS.BAD_REQUEST.infoCodes.INVALID_PASSWORD]: optionalData,
    };

    // Call parent response
    return this.res.badRequest({ infoCodes });

  } catch (error) {
    return this.res.serverError(error);
  }
};
