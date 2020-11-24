module.exports.routes = {

  // health
  'GET /health/ping': 'HealthController.ping',

  // player
  'POST /player/register': 'PlayerController.register',
  'POST /player':          'PlayerController.login',


};
