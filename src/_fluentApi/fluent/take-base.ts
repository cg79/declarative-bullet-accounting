import {
  ModuleFunctionType,
  TakeFieldType,
  TraceType,
} from "./fluent-bullet-base";
import TakeKey from "./take-key";
import WrapperModuleFunction from "./wrapper-module-function";

class TakeBase {
  protected selectList: any[] = [];

  addFromInto(fromInto: TakeFieldType) {
    const selectFieldInstance = new TakeKey();
    fromInto(selectFieldInstance);

    this.selectList.push(selectFieldInstance);
    return this;
  }

  // selectFromInto(from: string, into: string) {
  //   this.selectList.push({
  //     from,
  //     into,
  //   });

  //   return this;
  // }

  protected fieldsV = "";
  fields(value: string) {
    this.fieldsV = value;
    return this;
  }

  protected excludeV = "";
  exclude(value: string) {
    this.excludeV = value;
    return this;
  }

  protected includeV = null;
  include(value: any) {
    if (typeof value !== "object") {
      throw new Error("include must be an object");
    }
    this.includeV = value;
    return this;
  }

  protected keyV = "";
  key(value: string) {
    this.keyV = value;
    return this;
  }

  protected moduleFunctionInstance: WrapperModuleFunction | null = null;
  run(builder: ModuleFunctionType) {
    const instance = new WrapperModuleFunction();
    builder(instance);

    this.moduleFunctionInstance = instance;

    return this;
  }
}

export default TakeBase;
