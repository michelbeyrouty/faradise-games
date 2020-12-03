const HTTP_EXITS = sails.config.custom.HTTP_EXITS;

module.exports = function playerHasPendingGameSession (optionalData = sails.__('responses.playerHasPendingGameSession')) {

  try {
  // Define the infoCodes for more specific details
    const infoCodes = {
      [HTTP_EXITS.UNAUTHORIZED.infoCodes.PLAYER_HAS_PENDING_GAME_SESSION]: optionalData,
    };

    // Call parent response
    return this.res.unauthorized({ infoCodes });

  } catch (error) {
    return this.res.serverError(error);
  }
};
