import BodyField from "./body-field";
import BulletStorage from "./bullet-storage";
import SelectKey from "./take-key";
import Select from "./take";
import TakeBase from "./take-base";
import StopIf from "./stop-if";
import Join from "./join";
import JoinCollection from "./join-collection";
import Find from "./find";
import Sort from "./Sort";
import Page from "./Page";
import WrapperFind from "./wrapper-find";
import WrapperSort from "./wrapper-sort";
import WrapperPage from "./wrapper-page";
import WrapperJoin from "./wrapper-join";
import WrapperBodyField from "./wrapper-body-field";
import WrapperStorage from "./wrapper-storage";
import WrapperTake from "./wrapper-take";
import Collection from "./collection";
import ModuleFunction from "./module-function";
import WrapperCollection from "./wrapper-collection";
import WrapperModuleFunction from "./wrapper-module-function";
import reuse from "../reuse";
import WrapperLog from "./wrapper-log";
import Log from "./Log";
import Trace from "./Trace";
import WrapperTrigger from "./wrapper-trigger";
import Trigger from "./Trigger";
import WrapperTrace from "./wrapper-trace";
import { BULLET_METHOD } from "./constants";
import WrapperMethod from "./wrapper-method";
import { MethodType } from "./method";
export type BodyFieldFunctionType = (x: BodyField) => BodyField;
export type ModuleFunctionType = (x: ModuleFunction) => ModuleFunction;
export type StorageType = (x: BulletStorage) => BulletStorage;
export type TakeFieldType = (x: SelectKey) => SelectKey;
export type TakeType = (x: Select) => Select;
export type TakeBaseType = (x: TakeBase) => TakeBase;
export type JoinType = (x: Join) => Join;
export type PageType = (x: Page) => Page;
export type SortType = (x: Sort) => Sort;
export type JoinCollectionType = (x: JoinCollection) => JoinCollection;
export type ConditionFieldType = (x: StopIf) => StopIf;
export type FindType = (x: Find) => Find;
export type CollectionType = (x: Collection) => Collection;
export type LogType = (x: Log) => Log;
export type TraceType = (x: Trace) => Trace;
export type TriggerType = (x: Trigger) => Trigger;

class FluentBulletBase {
  protected _name = "";
  name(value: string) {
    this._name = value;
    return this;
  }

  protected forEach = false;
  useForEach(value: boolean) {
    this.forEach = value;
    return this;
  }

  protected _description = "";
  description(value: string) {
    this._description = value;
    return this;
  }

  protected _mergePreviousResultToFlowBody = false;
  mergePreviousResultToFlowBody(value: boolean) {
    this._mergePreviousResultToFlowBody = value;
    return this;
  }

  protected _mergePreviousResultToFlowResult = false;
  mergePreviousResultToFlowResult(value: boolean) {
    this._mergePreviousResultToFlowResult = value;
    return this;
  }

  protected _saveForLaterUse = false;
  saveForLaterUse(value: boolean) {
    this._saveForLaterUse = value;
    return this;
  }

  protected _flowName = "";
  executeFlowByName(flowName: string) {
    this._flowName = flowName;
    return this;
  }

  protected wrapperLog: WrapperLog | null = null;
  log(builder: LogType) {
    const inst = new WrapperLog();
    builder(inst);

    this.wrapperLog = inst;

    return this;
  }

  protected wrapperMethod: WrapperMethod | null = null;
  method(builder: MethodType) {
    const inst = new WrapperMethod();
    builder(inst);

    this.wrapperMethod = inst;

    return this;
  }

  protected wrapperTraceStart: WrapperTrace | null = null;
  traceStart(builder: TraceType) {
    const inst = new WrapperTrace();
    builder(inst);

    this.wrapperTraceStart = inst;

    return this;
  }

  protected wrapperTraceEnd: WrapperTrace | null = null;
  traceEnd(builder: TraceType) {
    const inst = new WrapperTrace();
    builder(inst);

    this.wrapperTraceEnd = inst;

    return this;
  }

  // protected wrapperTrigger: WrapperTrigger;
  // trigger(builder: TriggerType) {
  //   const inst = new WrapperTrigger();
  //   builder(inst);

  //   this.wrapperTrigger = inst;

  //   return this;
  // }

  protected _collection: WrapperCollection | null = null;
  collection(builder: CollectionType) {
    const inst = new WrapperCollection();
    builder(inst);

    this._collection = inst;
    return this;
  }

  insert(collectionName = "") {
    const inst = new WrapperCollection();
    if (collectionName) {
      inst.name(collectionName);
    }
    inst.method(BULLET_METHOD.INSERT);

    this._collection = inst;
    return this;
  }

  update(collectionName = "") {
    const inst = new WrapperCollection();
    if (collectionName) {
      inst.name(collectionName);
    }
    inst.method(BULLET_METHOD.UPDATE);

    this._collection = inst;
    return this;
  }

  updateOne(collectionName = "") {
    const inst = new WrapperCollection();
    if (collectionName) {
      inst.name(collectionName);
    }

    inst.method(BULLET_METHOD.UPDATE_ONE);
    this._collection = inst;
    return this;
  }

  deleteMany(collectionName = "") {
    const inst = new WrapperCollection();
    if (collectionName) {
      inst.name(collectionName);
    }
    inst.method(BULLET_METHOD.DELETE_MANY);

    this._collection = inst;
    return this;
  }

  deleteOne(collectionName = "") {
    const inst = new WrapperCollection();
    if (collectionName) {
      inst.name(collectionName);
    }
    inst.method(BULLET_METHOD.DELETE_ONE);

    this._collection = inst;
    return this;
  }

  pagination(collectionName = "") {
    const inst = new WrapperCollection();
    if (collectionName) {
      inst.name(collectionName);
    }
    inst.method(BULLET_METHOD.PAGINATION);

    this._collection = inst;
    return this;
  }

  find(collectionName = "") {
    const inst = new WrapperCollection();
    if (collectionName) {
      inst.name(collectionName);
    }
    inst.method(BULLET_METHOD.FIND);

    this._collection = inst;
    return this;
  }

  findOne(collectionName = "") {
    const inst = new WrapperCollection();
    if (collectionName) {
      inst.name(collectionName);
    }
    inst.method(BULLET_METHOD.FIND_ONE);

    this._collection = inst;
    return this;
  }

  //todo useprefix sa adaug aici si la flow

  protected keyValue = "";
  key(value: string) {
    this.keyValue = value;
    return this;
  }

  storageInstance: WrapperStorage | null = null;
  storage(builder: StorageType) {
    const instance = new WrapperStorage();
    builder(instance);

    this.storageInstance = instance;
    // this.data.storage = storageInstance.asJson();

    return this;
  }

  protected bodyV = null;
  body(data: any = {}) {
    this.bodyV = data;

    return this;
  }

  protected bodyFields: { key: string; instance: WrapperBodyField }[] = [];
  bodyField(fieldName: string, builder: BodyFieldFunctionType) {
    const instance = new WrapperBodyField();
    builder(instance);

    this.bodyFields.push({
      key: fieldName,
      instance,
    });

    return this;
  }

  // protected moduleFunctions: {
  //   key: string;
  //   instance: WrapperModuleFunction;
  // }[] = [];
  // moduleFunction(fieldName: string, builder: ModuleFunctionType) {
  //   const instance = new WrapperModuleFunction();
  //   builder(instance);

  //   this.moduleFunctions.push({
  //     key: fieldName,
  //     instance,
  //   });

  //   return this;
  // }

  protected wrapperTakeInstance: WrapperTake | null = null;
  take(builder: TakeType) {
    const instance = new WrapperTake();
    builder(instance);

    this.wrapperTakeInstance = instance;

    return this;
  }

  protected wrapperResponseInstance: WrapperTake | null = null;
  response(builder: TakeType) {
    const instance = new WrapperTake();
    builder(instance);

    this.wrapperResponseInstance = instance;

    return this;
  }

  // protected moduleFunctionInstance: WrapperModuleFunction;
  // run(builder: ModuleFunctionType) {
  //   const instance = new WrapperModuleFunction();
  //   builder(instance);

  //   this.moduleFunctionInstance = instance;

  //   return this;
  // }

  protected mergeFunctionInstance: WrapperModuleFunction | null = null;
  merge(builder: ModuleFunctionType) {
    const instance = new WrapperModuleFunction();
    builder(instance);

    this.mergeFunctionInstance = instance;

    return this;
  }

  protected lamdaInstance: WrapperModuleFunction | null = null;
  lamda(builder: ModuleFunctionType) {
    const instance = new WrapperModuleFunction();
    builder(instance);

    this.lamdaInstance = instance;

    return this;
  }

  protected joinList: WrapperJoin[] = [];
  join(builder: JoinType) {
    if (!this.joinList) {
      this.joinList = [];
    }
    const joinInstance = new WrapperJoin();
    builder(joinInstance);

    this.joinList.push(joinInstance);

    return this;
  }

  protected pageInstance: WrapperPage | null = null;
  page(builder: PageType) {
    const inst = new WrapperPage();
    builder(inst);

    this.pageInstance = inst;

    return this;
  }

  protected sortList: WrapperSort[] = [];
  sort(sortType: SortType) {
    if (!this.sortList) {
      this.sortList = [];
    }
    const sortInstance = new WrapperSort();
    sortType(sortInstance);

    this.sortList.push(sortInstance);

    return this;
  }
  sortFields(values: { field: string; ascending: boolean }[]) {
    if (!this.sortList) {
      this.sortList = [];
    }

    values.forEach((el) => {
      const sortInstance = new WrapperSort();
      sortInstance.field(el.field);
      sortInstance.ascending(el.ascending);
      this.sortList.push(sortInstance);
    });

    return this;
  }

  protected findInstance: WrapperFind | null = null;
  search(find: FindType) {
    const findInstance = new WrapperFind();
    find(findInstance);

    this.findInstance = findInstance;
    return this;
  }

  protected reqIdV = "";
  ReqId(value: string) {
    this.reqIdV = value;
  }

  asJsonBase() {
    const request: any = {};

    // if (!this._collection) {
    //   throw new Error('please set the collection information');
    // }

    if (this._name) {
      request["name"] = this._name;
    }

    if (this.forEach) {
      request["forEach"] = true;
    }

    if (this.reqIdV) {
      request["reqid"] = this.reqIdV;
    }

    if (this._description) {
      request["description"] = this._description;
    }

    if (this._saveForLaterUse) {
      request["saveForLaterUse"] = true;
    }

    if (this._mergePreviousResultToFlowBody) {
      request["mergePreviousResultToFlowBody"] = true;
    }

    if (this._mergePreviousResultToFlowResult) {
      request["mergePreviousResultToFlowResult"] = true;
    }

    if (this.lamdaInstance) {
      request["lamda"] = this.lamdaInstance.asJson();
    }

    if (this.wrapperLog) {
      const logObj = this.wrapperLog.asJson();
      if (logObj) {
        request["log"] = logObj;
      }
    }

    if (this.wrapperMethod && this.wrapperMethod.method) {
      request["method"] = this.wrapperMethod.method;
    }

    if (this.wrapperTraceStart) {
      const traceObj = this.wrapperTraceStart.asJson();
      if (traceObj) {
        request["traceStart"] = traceObj;
      }
    }

    if (this.wrapperTraceEnd) {
      const traceObj = this.wrapperTraceEnd.asJson();
      if (traceObj) {
        request["traceEnd"] = traceObj;
      }
    }

    // if (this.wrapperTrigger) {
    //   const obj = this.wrapperTrigger.asJson();
    //   if (obj) {
    //     request['trigger'] = obj;
    //   }
    // }

    if (this.bodyV) {
      request["body"] = this.bodyV;
    }

    if (this._collection) {
      request.collection = this._collection.asJson();
    }

    if (this.wrapperTakeInstance) {
      const takeAsJson = this.wrapperTakeInstance.asJson();
      if (takeAsJson) {
        request.take = takeAsJson;
      }
    }

    if (this.wrapperResponseInstance) {
      const responseAsJson = this.wrapperResponseInstance.asJson();
      if (responseAsJson) {
        request.response = responseAsJson;
      }
    }

    if (this.mergeFunctionInstance) {
      const responseAsJson = this.mergeFunctionInstance.asJson();
      if (responseAsJson) {
        request.merge = responseAsJson;
      }
    }

    // if (this.moduleFunctionInstance) {
    //   const responseAsJson = this.moduleFunctionInstance.asJson();
    //   if (responseAsJson) {
    //     request.run = responseAsJson;
    //   }
    // }

    if (this.findInstance) {
      request.find = this.findInstance.asJson();
    }

    if (this.storageInstance) {
      request["storage"] = this.storageInstance.asJson();
    }

    if (this.keyValue) {
      request.key = this.keyValue;
    }

    const bodyFields = reuse.createBodyFields(this.bodyFields);
    if (bodyFields) {
      request.bodyFields = bodyFields;
    }

    if (this.joinList && this.joinList.length) {
      const joins: any[] = [];
      let joinObj: any = null;
      this.joinList.forEach((el) => {
        joinObj = el.asJson();
        joins.push(joinObj);
      });
      request.join = joins;
    }

    const page = reuse.includePage(this.pageInstance);
    if (page) {
      request.page = page;
    }

    const sort = reuse.createSortObject(this.sortList);
    if (sort) {
      request.sort = sort;
    }

    if (this._flowName) {
      request["executeflowByName"] = this._flowName;
      request["collection"] = {
        name: "",
        method: "triggerExecuteFlow",
      };
    }

    return request;
  }
}

export default FluentBulletBase;
