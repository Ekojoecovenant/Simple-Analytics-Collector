export const collectEventSchema = {
  body: {
    type: "object",
    required: ["site_key", "url"],
    properties: {
      site_key: {
        type: "string",
        minLength: 10,
      },
      url: { type: "string", minLength: 1 },
      referrer: { type: "string" },
    },
  },
};
