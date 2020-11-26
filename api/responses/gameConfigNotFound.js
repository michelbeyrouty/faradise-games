const HTTP_EXITS = sails.config.custom.HTTP_EXITS;

module.exports = function gameConfigNotFound (optionalData = sails.__('responses.gameConfigNotFound')) {

  try {
  // Define the infoCodes for more specific details
    const infoCodes = {
      [HTTP_EXITS.NOT_FOUND.infoCodes.GAME_CONFIG_NOT_FOUND]: optionalData,
    };

    // Call parent response
    return this.res.notFound({ infoCodes });

  } catch (error) {
    return this.res.serverError(error);
  }
};
