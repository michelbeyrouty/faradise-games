module.exports = {

  friendlyName: 'Update domain',
  description:  'Update domain by id',

  inputs: {
    domainId: {
      type:     'string',
      required: true,
    },
    generalScoresMap: {
      type: 'json',
    },
  },

  exits: {
    domainNotFound: { description: 'domainNotFound' },
    success:        { description: 'domain' },
  },

  fn: async function (inputs, exits) {

    const { domainId, ...data } = inputs;

    await firebaseDb.collection(`${process.env.NODE_ENV}_domain`).doc(domainId).update(data);
    const domain = await firebaseDb.collection(`${process.env.NODE_ENV}_domain`).doc(domainId).get();

    return exits.success({
      ...domain.data(),
      domainId: domain.id,
    });

  },
};

