import fp from "fastify-plugin";
import pg from "pg";
import { config } from "dotenv";

const { Pool } = pg;
config();

async function dbPlugin(fastify, opts) {
  const pool = new Pool({
    connectionString:
      process.env.DATABASE_URL
  });

  fastify.decorate("db", pool);

  fastify.addHook("onClose", async (fastifyInstance, done) => {
    await pool.end();
    done();
  });
}

export default fp(dbPlugin);
