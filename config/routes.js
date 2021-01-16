module.exports.routes = {

  // health
  'GET /health/ping': 'HealthController.ping',

  // player
  'POST /player/register': 'PlayerController.register',
  'POST /player':          'PlayerController.login',
  'PUT /player':           'PlayerController.update',
  'DELETE /player':        'PlayerController.logout',
  'GET /player':           'PlayerController.list',

  // game session
  'POST /game-session':                'GameSessionController.add',
  'POST /game-session/approve':        'GameSessionController.approve',
  'GET  /game-session/configurations': 'GameSessionController.list-configurations',

  // statistics
  'POST /statistics/compute-general-score': 'StatisticsController.compute-general-score',
  'GET /statistics/general-score':          'StatisticsController.get-general-score',

};
