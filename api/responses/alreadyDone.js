const HTTP_EXITS = sails.config.custom.HTTP_EXITS;

module.exports = function alreadyDone (optionalData = { message: sails.__('responses.alreadyDone') }, statusCode) {
  try {

    const statusCodeToSet = statusCode || HTTP_EXITS.ALREADY_DONE.statusCode;

    return  this.res.status(statusCodeToSet)
      .send(optionalData);

  } catch (err) {
    return this.res.serverError(err);
  }

};
