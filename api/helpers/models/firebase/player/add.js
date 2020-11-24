module.exports = {

  friendlyName: 'Create game session',
  description:  'Create game session',

  inputs: {
    firstName: {
      type:     'string',
      required: true,
    },
    lastName: {
      type:     'string',
      required: true,
    },
    nickName: {
      type:     'string',
      required: true,
    },
    password: {
      type:     'string',
      required: true,
      //    isIn:     Object.values(sails.config.custom.SESSION_TYPE),
    },
    phoneNumber: {
      type:     'number',
      required: true,
    },
    email: {
      type:     'string',
      required: true,
    },
    dateOfBirthTimeStamp: {
      type: 'number',
    },
  },

  exits: {
    success: { description: 'gameSession' },
  },

  fn: async function (inputs, exits) {

    let player = await firebaseDb.collection('players').add(inputs);
    player = await firebaseDb.collection('gameSessions').doc(player.id).get();

    return exits.success({
      ...player.data(),
      playerId: player.id,
    });

  },

};

