import { Subgraph } from "@powerhousedao/reactor-api";
import { schema } from "./schema.js";
import { getResolvers } from "./resolvers.js";

export class LegalStructureNeedsAssessmentSubgraph extends Subgraph {
  name = "legal-structure-needs-assessment";
  typeDefs = schema;
  resolvers = getResolvers(this);
  additionalContextFields = {};
  async onSetup() {}
  async onDisconnect() {}
}
