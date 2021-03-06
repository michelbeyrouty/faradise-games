const GAME_APPROVAL_STATUS = sails.config.custom.GAME_APPROVAL_STATUS;

module.exports = {

  friendlyName: 'Reject game session',
  description:  'Reject game session',

  inputs: {
    gameSessionId: {
      type:     'string',
      required: true,
    },
  },

  exits: {
    gameSessionIsNotPending: { responseType: 'gameSessionIsNotPending' },
    playerNotInGameSession:  { responseType: 'playerNotInGameSession' },
    gameSessionNotFound:     { responseType: 'gameSessionNotFound' },
    serverError:             { responseType: 'serverError' },
    success:                 { description: 'ok' },
  },

  fn: async function (inputs, exits) {
    try {

      const { playerId } = this.req.player;

      const { approvalsMappedByUserId, gameSessionId, approvalStatus } = await sails.helpers.models.firebase.gameSession.getById.with(inputs);
      _checkIfGameSessionIsPending (approvalStatus);

      let gameSession = await _updateGameSessionApprovals(playerId, approvalsMappedByUserId, gameSessionId);
      gameSession = await _rejectGameSession(gameSessionId);

      await _updatePlayersGameSessionsList(approvalsMappedByUserId, gameSessionId);

      exits.success({
        gameSession,
      });

    } catch (error) {
      switch (_.get(error, 'raw.code') || _.get(error, 'code'))  {

        case 'gameSessionNotFound':
          exits.gameSessionNotFound();
          break;

        case 'gameSessionIsNotPending':
          exits.gameSessionIsNotPending();
          break;

        case 'playerNotInGameSession':
          exits.playerNotInGameSession();
          break;

        default:
          exits.serverError(error);
      }
    } finally {

      return exits;
    }
  },
};

// Private function

async function _updateGameSessionApprovals (playerId, approvalsMappedByUserId, gameSessionId) {

  const playerIdsList = Object.keys(approvalsMappedByUserId);

  if (!playerIdsList.includes(playerId)) {
    throw { code: 'playerNotInGameSession' };
  }

  approvalsMappedByUserId[playerId] = 'rejected';

  const gameSession = await sails.helpers.models.firebase.gameSession.updateById.with({
    approvalsMappedByUserId,
    gameSessionId,
  });

  return gameSession;
}

async function  _rejectGameSession (gameSessionId) {

  gameSession = await sails.helpers.models.firebase.gameSession.updateById.with({
    gameSessionId,
    approvalStatus: GAME_APPROVAL_STATUS.REJECTED,
  });

  return gameSession;
}

async function  _updatePlayersGameSessionsList (approvalsMappedByUserId, gameSessionId) {

  const playerIdsList = Object.keys(approvalsMappedByUserId);

  for (const playerId of playerIdsList) {
    await sails.helpers.models.firebase.player.rejectGameSession.with({
      gameSessionId,
      playerId,
    });
  }

}

function _checkIfGameSessionIsPending (approvalStatus) {

  if (approvalStatus !== GAME_APPROVAL_STATUS.PENDING) {
    throw { code: 'gameSessionIsNotPending' };
  }

}
