module.exports = {

  friendlyName: 'Add game session',
  description:  'Add game session',

  inputs: {
    playerIdsList: { // In order
      type:     ['string'],
      required: true,
    },
    gameType: {
      type:     'string',
      required: true,
      isIn:     Object.values(sails.config.custom.GAME_TYPES),
    },
  },

  exits: {
    duplicatePlayerInGame: { responseType: 'duplicatePlayerInGame' },
    gameConfigNotFound:    { responseType: 'gameConfigNotFound' },
    playerNotFound:        { responseType: 'playerNotFound' },
    serverError:           { responseType: 'serverError' },
    success:               { description: 'ok' },
  },

  fn: async function (inputs, exits) {
    try {

      // TODO: think of a way to prevent same requests

      const gameSession = await _fetchGameSession(inputs);
      await gameSession.validatePlayers();
      const scoresMap = gameSession.computeScores();

      const { gameSessionId } = await sails.helpers.models.firebase.gameSession.add.with({
        ...inputs,
        scoresMap,
      });

      for (playerId of gameSession.playerIdsList) {
        await sails.helpers.models.firebase.player.addGameSession.with({ playerId, gameSessionId });
      }

      exits.success(this.req.player);

    } catch (error) {
      switch (_.get(error, 'raw.code') || _.get(error, 'code'))  {

        case 'playerNotFound':
          exits.playerNotFound();
          break;

        case 'gameConfigNotFound':
          exits.gameConfigNotFound();
          break;

        case 'duplicatePlayerInGame':
          exits.duplicatePlayerInGame();
          break;

        default:
          exits.serverError(error);
      }
    } finally {

      return exits;
    }
  },
};


async function _fetchGameSession ({ gameType, playerIdsList }) {

  const { minPlayers, maxPlayers, DeliminatorsMap, scoreMultiplier, maxScore }
  = await sails.helpers.models.firebase.gameSessionConfig.getByType.with({ gameType });

  const gameSession = new sails.classes.GameSession({
    gameType, playerIdsList, maxScore, minPlayers, maxPlayers, DeliminatorsMap, scoreMultiplier });

  return gameSession;
}
