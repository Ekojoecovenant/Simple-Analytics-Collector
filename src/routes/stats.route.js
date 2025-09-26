import { getSiteStatus } from "../controllers/stats.controller.js";

async function statsRoutes(fastify, opts) {
  fastify.get("/:id", {
    preHandler: [fastify.authenticate],
    handler: getSiteStatus,
  });
}

export default statsRoutes;
