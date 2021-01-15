class GameSession {

  constructor ({ gameSessionsList = [], generalScoresMap = {} }) {
    this.gameSessionsList = gameSessionsList;
    this.generalScoresMap = generalScoresMap;
  }

  /**
   * computeGeneralScoresMap
   *
   */
  computeGeneralScoresMap () {

    const generalScoresMap = this.generalScoresMap;
    let scoresMap = {};
    let gameType = '';

    for (const gameSession of this.gameSessionsList) {

      scoresMap = gameSession.scoresMap;
      gameType = gameSession.gameType;

      for (const playerId of Object.keys(scoresMap)) {

        if (!generalScoresMap[playerId]) {
          generalScoresMap[playerId] = {};
        }

        if (!generalScoresMap[playerId][gameType]) {
          generalScoresMap[playerId][gameType] = {};
        }

        if (!generalScoresMap[playerId]['ALL']) {
          generalScoresMap[playerId]['ALL'] = {};
        }

        // Per gameType
        generalScoresMap[playerId][gameType]['totalScore'] = (generalScoresMap[playerId][gameType]['totalScore'] || 0) + scoresMap[playerId];
        generalScoresMap[playerId][gameType]['timesPlayed'] = (generalScoresMap[playerId][gameType]['timesPlayed'] || 0) + 1;

        // All
        generalScoresMap[playerId]['ALL']['totalScore'] = (generalScoresMap[playerId]['ALL']['totalScore'] || 0) + scoresMap[playerId];
        generalScoresMap[playerId][gameType]['timesPlayed'] = (generalScoresMap[playerId]['ALL']['timesPlayed'] || 0) + 1;

      }

      // set gameSession as processed
    }

    this.generalScoresMap = generalScoresMap;
  }

  getGeneralScoresMap () {
    return this.generalScoresMap;
  }


}

module.exports = GameSession;

// Private functions
