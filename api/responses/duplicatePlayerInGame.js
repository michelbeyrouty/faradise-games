const HTTP_EXITS = sails.config.custom.HTTP_EXITS;

module.exports = function duplicatePlayerInGame (optionalData = sails.__('responses.duplicatePlayerInGame')) {

  try {
  // Define the infoCodes for more specific details
    const infoCodes = {
      [HTTP_EXITS.BAD_REQUEST.infoCodes.DUPLICATE_PLAYER_IN_GAME]: optionalData,
    };

    // Call parent response
    return this.res.badRequest({ infoCodes });

  } catch (error) {
    return this.res.serverError(error);
  }
};
