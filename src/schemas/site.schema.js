export const createSiteSchema = {
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
        minLength: 1,
        maxLength: 100,
      },
    },
  },
};

export const getSiteByKeySchema = {
  queryString: {
    type: "object",
    required: ["site_key"],
    properties: {
      type: "string",
      minLength: 10,
    },
  },
};

export const getSiteStatsSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer" },
    },
  },
};
