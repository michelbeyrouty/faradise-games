const HTTP_EXITS = sails.config.custom.HTTP_EXITS;

module.exports = function gameSessionIsNotPending (optionalData = sails.__('responses.gameSessionIsNotPending')) {

  try {
  // Define the infoCodes for more specific details
    const infoCodes = {
      [HTTP_EXITS.UNAUTHORIZED.infoCodes.GAME_SESSION_NOT_PENDING]: optionalData,
    };

    // Call parent response
    return this.res.unauthorized({ infoCodes });

  } catch (error) {
    return this.res.serverError(error);
  }
};
