module.exports = {

  friendlyName: 'Get domain',
  description:  'Get domain by id',

  inputs: {
    domainId: {
      type:     'string',
      required: true,
    },
  },

  exits: {
    domainNotFound: { description: 'domainNotFound' },
    success:        { description: 'domain' },
  },

  fn: async function (inputs, exits) {

    const domainRef = firebaseDb.collection(`${process.env.NODE_ENV}_domain`).doc(inputs.domainId);
    const domain = await domainRef.get();

    if (!domain.exists) {
      throw { code: 'domainNotFound' };
    }

    return exits.success({
      ...domain.data(),
    });
  },
};
