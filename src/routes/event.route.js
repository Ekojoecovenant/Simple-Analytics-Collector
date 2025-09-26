import { collectEvent } from "../controllers/event.controller.js";
import { collectEventSchema } from "../schemas/event.schema.js";

async function eventRoutes(fastify, opts) {
  // Public endpoint (no auth required)
  fastify.post("/", {
    schema: collectEventSchema,
    handler: collectEvent,
  });
}

export default eventRoutes;
