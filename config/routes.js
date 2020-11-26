module.exports.routes = {

  // health
  'GET /health/ping': 'HealthController.ping',

  // player
  'POST /player/register': 'PlayerController.register',
  'POST /player':          'PlayerController.login',
  'DELETE /player':        'PlayerController.logout',

  // game session
  'POST /game-session': 'GameSessionController.add',
};
