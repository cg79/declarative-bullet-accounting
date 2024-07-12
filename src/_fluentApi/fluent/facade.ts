
import BodyField from "./body-field";
import BulletStorage from "./bullet-storage";
import ModuleFunction from "./module-function";
import Collection from "./collection";
import Log from "./Log";
import Trace from "./Trace";
import Trigger from "./Trigger";
import { IPage } from "./IPage";
import {
  ConditionFieldType,
  JoinType,
  SortType,
  TakeType,
} from "./fluent-bullet-base";
import Find from "./find";
export type FindType = (x: Find) => Find;

export type BodyFieldFunctionType = (x: BodyField) => BodyField;
export type ModuleFunctionType = (x: ModuleFunction) => ModuleFunction;
export type StorageType = (x: BulletStorage) => BulletStorage;
export type PageType = (x: IPage) => IPage;
export type CollectionType = (x: Collection) => Collection;
export type LogType = (x: Log) => Log;
export type TraceType = (x: Trace) => Trace;
export type TriggerType = (x: Trigger) => Trigger;

export interface IBulletFlowApi {
    stopIf(builder: ConditionFieldType): IBulletFlowApi;
    executeIf(builder: ConditionFieldType): IBulletFlowApi;
    flow(flowBuilder: FlowFunctionType): IBulletFlowApi;
  
    name(value: string): IBulletFlowApi;
    description(value: string): IBulletFlowApi;
    mergePreviousResultToFlowBody(value: boolean): IBulletFlowApi;
    mergePreviousResultToFlowResult(value: boolean): IBulletFlowApi;
    saveForLaterUse(value: boolean): IBulletFlowApi;
    executeFlowByName(flowName: string): IBulletFlowApi;
    log(builder: LogType): IBulletFlowApi;
    traceStart(builder: TraceType): IBulletFlowApi;
    traceEnd(builder: TraceType): IBulletFlowApi;
    collection(builder: CollectionType): IBulletFlowApi;
    insert(collectionName): IBulletFlowApi;
    update(collectionName): IBulletFlowApi;
    updateOne(collectionName): IBulletFlowApi;
    delete(collectionName): IBulletFlowApi;
    deleteOne(collectionName): IBulletFlowApi;
    pagination(collectionName): IBulletFlowApi;
    find(collectionName): IBulletFlowApi;
    findOne(collectionName): IBulletFlowApi;
    key(value: string): IBulletFlowApi;
    storage(builder: StorageType): IBulletFlowApi;
    body(data: any): IBulletFlowApi;
    bodyField(fieldName: string, builder: BodyFieldFunctionType): IBulletFlowApi;
    take(builder: TakeType): IBulletFlowApi;
    response(builder: TakeType): IBulletFlowApi;
    merge(builder: ModuleFunctionType): IBulletFlowApi;
    join(builder: JoinType): IBulletFlowApi;
    page(builder: PageType): IBulletFlowApi;
    sort(sortType: SortType): IBulletFlowApi;
    search(find: FindType): IBulletFlowApi;
    ReqId(value: string): IBulletFlowApi;
  }

export type FlowFunctionType = (x: IBulletFlowApi) => IBulletFlowApi;