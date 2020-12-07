module.exports = {

  friendlyName: 'Update player by id',
  description:  'Update player by id',

  inputs: {
    playerId: {
      type:     'string',
      required: true,
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    userName: {
      type: 'string',
    },
    phoneNumber: {
      type: 'number',
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    dateOfBirthTimeStamp: {
      type: 'number',
    },
  },

  exits: {
    playerNotFound: { description: 'playerNotFound' },
    success:        { description: 'gameSession' },
  },

  fn: async function (inputs, exits) {

    const { playerId, ...data } = inputs;

    await firebaseDb.collection(`${process.env.NODE_ENV}_players`).doc(playerId).update(data);
    const player = await firebaseDb.collection(`${process.env.NODE_ENV}_players`).doc(playerId).get();

    return exits.success({
      ...player.data(),
      playerId: player.id,
    });

  },
};
