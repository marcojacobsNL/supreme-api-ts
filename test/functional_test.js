const { SupremeClient } = require('../dist/index');

const fire = async () => {
  const client = new SupremeClient();
  try {
    const { data } = await client.getProduct('Goggles');
    console.log(data);
  } catch (e) {
    console.error(e);
  }
};

fire();
