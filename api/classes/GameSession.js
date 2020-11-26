class GameSession {

  constructor ({ gameType, playerIdsList = [], minPlayers, maxPlayers, DeliminatorsMap, maxScore, scoreMultiplier = 0 }) {
    this.gameType = gameType;
    this.minPlayers = minPlayers;
    this.maxPlayers = maxPlayers;
    this.DeliminatorsMap = DeliminatorsMap;
    this.scoreMultiplier = scoreMultiplier;
    this.playerIdsList = playerIdsList;
    this.maxScore = maxScore;
  }


  /**
     * validatePlayers
     *
     * validate player count, playerIds and duplicity
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
      await sails.helpers.models.firebase.player.getById.with({ playerId });
    }
  }


  /**
  * computeScores
  *
  * compute score for each player
  */
  computeScores () {
    const scoresMap = {};
    let MAX_SCORE = this.maxScore * (1 + this.scoreMultiplier / 100);

    for (const playerId of this.playerIdsList) {
      MAX_SCORE = MAX_SCORE * this.DeliminatorsMap[this.playerIdsList.length].shift() / 100;
      scoresMap[playerId] = MAX_SCORE;
    }

    return scoresMap;
  }

}

module.exports = GameSession;

// Private functions


function _playerIdsListhasDuplicates ({ playerIdsList }) {
  return _.uniq(playerIdsList).length !== playerIdsList.length;
}
