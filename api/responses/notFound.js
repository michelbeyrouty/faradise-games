const HTTP_EXITS = sails.config.custom.HTTP_EXITS;

module.exports = function notFound (optionalData, statusCode) {

  // Define the status code to send in the response.
  const statusCodeToSet = statusCode || HTTP_EXITS.NOT_FOUND.statusCode;

  return this.res.status(statusCodeToSet).send(optionalData);
};
