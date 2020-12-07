class GameSession {

  constructor ({ gameType, playerIdsList = [], minPlayers, maxPlayers, deliminatorsMap, maxScore, scoreMultiplier = 0 }) {
    this.gameType = gameType;
    this.minPlayers = minPlayers;
    this.maxPlayers = maxPlayers;
    this.deliminatorsMap = deliminatorsMap;
    this.scoreMultiplier = scoreMultiplier;
    this.playerIdsList = playerIdsList;
    this.maxScore = maxScore;
  }


  /**
     * validatePlayers
     *
     * validate player count, playerIds, pendingGameSessions and duplicity
     */
  async validatePlayers () {

    const numberOfPlayers = this.playerIdsList.length;

    if ((numberOfPlayers < this.minPlayers ) || (numberOfPlayers > this.maxPlayers ) || (numberOfPlayers <= 0) ) {
      throw { code: 'invalidPlayerCount' };
    }

    if (_playerIdsListhasDuplicates({ playerIdsList: this.playerIdsList })) {
      throw { code: 'duplicatePlayerInGame' };
    }

    for (const playerId of this.playerIdsList) {
      const player = await sails.helpers.models.firebase.player.getById.with({ playerId });

      if (player.pendingGameSession && (player.pendingGameSession !== '')) {
        throw { code: 'playerHasPendingGameSession', playerId };
      }
    }
  }


  /**
  * computeScores
  *
  * compute score for each player
  */
  computeScores () {
    const scoresMap = {};
    const approvalsMappedByUserId = {};
    let MAX_SCORE = this.maxScore * (1 + this.scoreMultiplier / 100);

    for (const playerId of this.playerIdsList) {
      MAX_SCORE = MAX_SCORE * this.deliminatorsMap[this.playerIdsList.length].shift() / 100;
      scoresMap[playerId] = MAX_SCORE;
      approvalsMappedByUserId[playerId] = false;
    }

    return { scoresMap, approvalsMappedByUserId };
  }

}

module.exports = GameSession;

// Private functions


function _playerIdsListhasDuplicates ({ playerIdsList }) {
  return _.uniq(playerIdsList).length !== playerIdsList.length;
}
