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
    success: { description: 'player' },
  },

  fn: async function (inputs, exits) {

    let player = await firebaseDb.collection('players').add(inputs);
    player = await firebaseDb.collection('players').doc(player.id).get();

    return exits.success({
      ...player.data(),
      playerId: player.id,
    });

  },

};

