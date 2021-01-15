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

    this.gameSessionsList.forEach((gameSession) => {

      scoresMap = gameSession.scoresMap;
      gameType = gameSession.gameType;

      for (const playerId of Object.keys(scoresMap)) {

        if (!generalScoresMap[playerId]) {
          generalScoresMap[playerId] = {};
        }

        if (!generalScoresMap[playerId][gameType]) {
          generalScoresMap[playerId][gameType] = {};
          generalScoresMap[playerId][gameType]['gamesPlayed'] = 0;
          generalScoresMap[playerId][gameType]['totalScore'] = 0;
        }

        if (!generalScoresMap[playerId]['ALL']) {
          generalScoresMap[playerId]['ALL'] = {};
          generalScoresMap[playerId]['ALL']['gamesPlayed'] = 0;
          generalScoresMap[playerId]['ALL']['totalScore'] = 0;
        }

        // Per gameType
        generalScoresMap[playerId][gameType]['gamesPlayed'] += 1;
        generalScoresMap[playerId][gameType]['totalScore'] = generalScoresMap[playerId][gameType]['totalScore'] + scoresMap[playerId];

        // All
        generalScoresMap[playerId]['ALL']['gamesPlayed'] += 1;
        generalScoresMap[playerId]['ALL']['totalScore'] = generalScoresMap[playerId]['ALL']['totalScore'] + scoresMap[playerId];
      }

      // set gameSession as processed
    });


    this.generalScoresMap = generalScoresMap;
  }

  getGeneralScoresMap () {
    return this.generalScoresMap;
  }


}

module.exports = GameSession;

// Private functions
