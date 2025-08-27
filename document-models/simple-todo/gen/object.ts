import {
  BaseDocumentClass,
  type BaseStateFromDocument,
  type PartialState,
  applyMixins,
  type SignalDispatch,
} from "document-model";
import {
  type SimpleTodoState,
  type SimpleTodoLocalState,
  type SimpleTodoDocument,
} from "./types.js";
import { type SimpleTodoAction } from "./actions.js";
import { reducer } from "./reducer.js";
import utils from "./utils.js";
import SimpleTodo_Todos from "./todos/object.js";

export * from "./todos/object.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface SimpleTodo extends SimpleTodo_Todos {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class SimpleTodo extends BaseDocumentClass<
  SimpleTodoState,
  SimpleTodoLocalState,
  SimpleTodoAction
> {
  static fileExtension = "stodo";

  constructor(
    initialState?: Partial<BaseStateFromDocument<SimpleTodoDocument>>,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, utils.createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, SimpleTodo.fileExtension, name);
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

applyMixins(SimpleTodo, [SimpleTodo_Todos]);

export { SimpleTodo };
