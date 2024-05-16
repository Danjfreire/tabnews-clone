import { Client } from "pg";

async function query(queryObj) {
  const client = await getNewClient();

  try {
    const result = await client.query(queryObj);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  await client.connect();

  return client;
}

export default {
  query,
  getNewClient,
};
