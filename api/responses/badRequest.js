const HTTP_EXITS = sails.config.custom.HTTP_EXITS;

module.exports = function badRequest (optionalData, statusCode) {

  // Define the status code to send in the response.
  const statusCodeToSet = statusCode || HTTP_EXITS.BAD_REQUEST.statusCode;

  return this.res.status(statusCodeToSet).send(optionalData);
};
