import { ModuleFunctionType, TakeType } from "./fluent-bullet-base";
import WrapperModuleFunction from "./wrapper-module-function";
import WrapperTake from "./wrapper-take";

class BodyField {
  protected routeV = "";

  protected sendV = {};

  route(value: string) {
    this.routeV = value;
    return this;
  }

  protected takeFieldInstance: WrapperTake | null = null;
  take(builder: TakeType) {
    const instance = new WrapperTake();
    builder(instance);
    this.takeFieldInstance = instance;

    // const selectAsJson = selectFieldInstance.asJson();
    // if (selectAsJson) {
    //   this.takeObjValue.select = selectAsJson;
    // }

    return this;
  }

  protected responseFieldInstance: WrapperTake | null = null;
  response(builder: TakeType) {
    const instance = new WrapperTake();
    builder(instance);
    this.responseFieldInstance = instance;
    return this;
  }

  protected moduleFunctionInstance: WrapperModuleFunction | null = null;

  moduleFunction(builder: ModuleFunctionType) {
    const instance = new WrapperModuleFunction();
    builder(instance);

    this.moduleFunctionInstance = instance;

    return this;
  }
}

export default BodyField;
