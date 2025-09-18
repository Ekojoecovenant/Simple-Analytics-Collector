import Fastify from "fastify";
import dbPlugin from "./plugins/db";
import authPlugin from "./plugins/auth";

function buildApp(opts = {}) {
  const app = Fastify(opts);

  // Register plugins
  app.register(dbPlugin);
  app.register(authPlugin);

  // Test route
  app.get("/", async () => {
    return { msg: "Simple Analytics Collector API" };
  });

  return app;
}

export default buildApp;
