import { Subgraph } from "@powerhousedao/reactor-api";
import { schema } from "./schema.js";
import { getResolvers } from "./resolvers.js";

export class WorkBreakdownStructureSubgraph extends Subgraph {
  name = "work-breakdown-structure";
  typeDefs = schema;
  resolvers = getResolvers(this);
  additionalContextFields = {};
  async onSetup() {}
  async onDisconnect() {}
}
