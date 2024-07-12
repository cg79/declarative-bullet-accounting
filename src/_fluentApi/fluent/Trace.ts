import { TakeBaseType, TakeType } from "./fluent-bullet-base";
import WrapperTake from "./wrapper-take";

class Trace {
  protected collectionV = "";
  collection(value: string) {
    this.collectionV = value;
    return this;
  }

  protected descriptionV = "";
  description(value: string) {
    this.descriptionV = value;
    return this;
  }

  protected routeV = "";
  route(value: string) {
    this.routeV = value;
    return this;
  }

  protected takeFieldInstance: WrapperTake | null = null;
  take(builder: TakeBaseType) {
    const instance = new WrapperTake();
    builder(instance);
    this.takeFieldInstance = instance;

    // const selectAsJson = selectFieldInstance.asJson();
    // if (selectAsJson) {
    //   this.takeObjValue.select = selectAsJson;
    // }

    return this;
  }
}

export default Trace;
