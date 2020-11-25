const HTTP_EXITS = sails.config.custom.HTTP_EXITS;

module.exports = function invalidAuthToken (optionalData = sails.__('responses.invalidAuthToken')) {

  try {
  // Define the infoCodes for more specific details
    const infoCodes = {
      [HTTP_EXITS.UNAUTHORIZED.infoCodes.INVALID_AUTH_TOKEN]: optionalData,
    };

    // Call parent response
    return this.res.unauthorized({ infoCodes });

  } catch (error) {
    return this.res.serverError(error);
  }
};
