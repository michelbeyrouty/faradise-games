const GAME_APPROVAL_STATUS = sails.config.custom.GAME_APPROVAL_STATUS;

module.exports = {

  friendlyName: 'Approve game session',
  description:  'Approve game session',

  inputs: {
    gameSessionId: {
      type:     'string',
      required: true,
    },
  },

  exits: {
    gameSessionNotFound: { responseType: 'gameSessionNotFound' },
    serverError:         { responseType: 'serverError' },
    success:             { description: 'ok' },
  },

  fn: async function (inputs, exits) {
    try {

      const { playerId } = this.req.player;

      const { approvalsMappedByUserId, gameSessionId } = await sails.helpers.models.firebase.gameSession.getById.with(inputs);

      let gameSession = await _updateGameSessionApprovals(playerId, approvalsMappedByUserId, gameSessionId);

      if (!Object.values(approvalsMappedByUserId).includes(false)) {
        gameSession = await _approveGameSession(gameSessionId);
        await _updatePlayersGameSessionsList(approvalsMappedByUserId, gameSessionId);
      }

      exits.success({
        gameSession,
      });

    } catch (error) {
      switch (_.get(error, 'raw.code') || _.get(error, 'code'))  {

        case 'gameSessionNotFound':
          exits.gameSessionNotFound();
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

  approvalsMappedByUserId[playerId] = true;

  const gameSession = await sails.helpers.models.firebase.gameSession.updateById.with({
    approvalsMappedByUserId,
    gameSessionId,
  });

  return gameSession;
}

async function  _approveGameSession (gameSessionId) {

  gameSession = await sails.helpers.models.firebase.gameSession.updateById.with({
    gameSessionId,
    approvalStatus: GAME_APPROVAL_STATUS.APPROVED,
  });

  return gameSession;
}

async function  _updatePlayersGameSessionsList (approvalsMappedByUserId, gameSessionId) {

  const playerIdsList = Object.keys(approvalsMappedByUserId);

  for (const playerId of playerIdsList) {
    await sails.helpers.models.firebase.player.approveGameSession.with({
      gameSessionId,
      playerId,
    });
  }

}
