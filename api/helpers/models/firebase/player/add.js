module.exports = {

  friendlyName: 'Add player',
  description:  'Add player',

  inputs: {
    userName: {
      type:     'string',
      required: true,
    },
    password: {
      type:     'string',
      required: true,
    },
    email: {
      type:     'string',
      required: true,
    },
  },

  exits: {
    userNameAlreadyRegistered: { description: 'player' },
    success:                   { description: 'player' },
  },

  fn: async function (inputs, exits) {

    const { userName, ...inputData } = inputs;

    await _validateUniqueUserName(userName);

    await firebaseDb.collection(`${process.env.NODE_ENV}_players`).doc(userName).set(inputData);
    const player = await firebaseDb.collection(`${process.env.NODE_ENV}_players`).doc(userName).get();

    return exits.success({
      ...player.data(),
      playerId: player.id,
    });

  },

};


async function _validateUniqueUserName (userName) {

  const playerRef = await firebaseDb.collection(`${process.env.NODE_ENV}_players`).doc(userName);
  const player = await playerRef.get();

  if (player.exists) {
    throw {
      code:   'userNameAlreadyRegistered',
      player: {
        ...player.data(),
        playerId: player.id,
      },
    };
  }
}

