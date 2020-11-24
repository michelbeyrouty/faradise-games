const HTTP_EXITS = sails.config.custom.HTTP_EXITS;

module.exports = function authTokenExpired (optionalData = sails.__('responses.authTokenExpired')) {

  try {
  // Define the infoCodes for more specific details
    const infoCodes = {
      [HTTP_EXITS.BAD_REQUEST.infoCodes.AUTH_TOKEN_EXPIRED]: optionalData,
    };

    // Call parent response
    return this.res.badRequest({ infoCodes });

  } catch (error) {
    return this.res.serverError(error);
  }
};
