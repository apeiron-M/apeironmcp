import {
  BaseDocumentClass,
  type BaseStateFromDocument,
  type PartialState,
  applyMixins,
  type SignalDispatch,
} from "document-model";
import {
  type LegalStructureNeedsAssessmentState,
  type LegalStructureNeedsAssessmentLocalState,
  type LegalStructureNeedsAssessmentDocument,
} from "./types.js";
import { type LegalStructureNeedsAssessmentAction } from "./actions.js";
import { reducer } from "./reducer.js";
import utils from "./utils.js";
import LegalStructureNeedsAssessment_Organization from "./organization/object.js";
import LegalStructureNeedsAssessment_StrategicGoals from "./strategic-goals/object.js";
import LegalStructureNeedsAssessment_OperationalNeeds from "./operational-needs/object.js";
import LegalStructureNeedsAssessment_CommercialIp from "./commercial-ip/object.js";
import LegalStructureNeedsAssessment_Governance from "./governance/object.js";
import LegalStructureNeedsAssessment_Assessment from "./assessment/object.js";

export * from "./organization/object.js";
export * from "./strategic-goals/object.js";
export * from "./operational-needs/object.js";
export * from "./commercial-ip/object.js";
export * from "./governance/object.js";
export * from "./assessment/object.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface LegalStructureNeedsAssessment
  extends LegalStructureNeedsAssessment_Organization,
    LegalStructureNeedsAssessment_StrategicGoals,
    LegalStructureNeedsAssessment_OperationalNeeds,
    LegalStructureNeedsAssessment_CommercialIp,
    LegalStructureNeedsAssessment_Governance,
    LegalStructureNeedsAssessment_Assessment {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class LegalStructureNeedsAssessment extends BaseDocumentClass<
  LegalStructureNeedsAssessmentState,
  LegalStructureNeedsAssessmentLocalState,
  LegalStructureNeedsAssessmentAction
> {
  static fileExtension = "lsna";

  constructor(
    initialState?: Partial<
      BaseStateFromDocument<LegalStructureNeedsAssessmentDocument>
    >,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, utils.createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(
      path,
      LegalStructureNeedsAssessment.fileExtension,
      name,
    );
  }

  public loadFromFile(path: string) {
    return super.loadFromFile(path);
  }

  static async fromFile(path: string) {
    const document = new this();
    await document.loadFromFile(path);
    return document;
  }
}

applyMixins(LegalStructureNeedsAssessment, [
  LegalStructureNeedsAssessment_Organization,
  LegalStructureNeedsAssessment_StrategicGoals,
  LegalStructureNeedsAssessment_OperationalNeeds,
  LegalStructureNeedsAssessment_CommercialIp,
  LegalStructureNeedsAssessment_Governance,
  LegalStructureNeedsAssessment_Assessment,
]);

export { LegalStructureNeedsAssessment };
