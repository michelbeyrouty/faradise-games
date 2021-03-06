const HTTP_EXITS = sails.config.custom.HTTP_EXITS;

module.exports = function invalidAuthHeader (optionalData = sails.__('responses.invalidAuthHeader')) {

  try {
  // Define the infoCodes for more specific details
    const infoCodes = {
      [HTTP_EXITS.UNAUTHORIZED.infoCodes.INVALID_AUTH_HEADER]: optionalData,
    };

    // Call parent response
    return this.res.unauthorized({ infoCodes });

  } catch (error) {
    return this.res.serverError(error);
  }
};
