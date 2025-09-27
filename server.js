import buildApp from "./src/app.js";
import { config } from "dotenv";
config();

const fastify = buildApp({ logger: true });

const PORT = process.env.PORT || 3001;

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server listening at ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
