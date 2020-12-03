// PLAYER_ALREADY_REGISTERED

const HTTP_EXITS = sails.config.custom.HTTP_EXITS;

module.exports = function userNameAlreadyRegistered (optionalData = sails.__('responses.userNameAlreadyRegistered')) {

  try {

    const infoCodes = {
      [HTTP_EXITS.ALREADY_DONE.infoCodes.PLAYER_ALREADY_REGISTERED]: optionalData,
    };

    // Call parent response
    return this.res.badRequest({ infoCodes });

  } catch (error) {
    return this.res.serverError(error);
  }
};
