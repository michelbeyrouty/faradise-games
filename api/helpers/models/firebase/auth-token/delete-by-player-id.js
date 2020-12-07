module.exports = {

  friendlyName: 'Delete token',
  description:  'Delete tokens related to specific playerId',

  inputs: {
    playerId: {
      type:     'string',
      required: true,
    },
  },

  exits: {
    invalidPlayerId: { description: 'invalidPlayerId' },
    success:         { description: '' },
  },

  fn: async function (inputs, exits) {

    const result = await firebaseDb
        .collection(`${process.env.NODE_ENV}_authTokens`)
        .where('playerId', '==', inputs.playerId)
        .get();

    if (result.empty) {
      throw { code: 'invalidPlayerId' };
    }

    const authTokensIdList = _mapResult({ result });
    for (authTokenId of authTokensIdList) {
      await firebaseDb.collection(`${process.env.NODE_ENV}_authTokens`).doc(authTokenId).delete();
    }

    return exits.success();
  },
};


/**
     * _mapResult
     *
     * @param {json} inputs
     * @param {json} inputs.result
     *
     */
function _mapResult ({ result }) {

  const authTokensIdList = [];

  result.forEach(authToken => {
    authTokensIdList.push(authToken.id);
  });

  return authTokensIdList;
}
