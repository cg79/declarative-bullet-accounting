import BodyField from "./body-field";

class WrapperBodyField extends BodyField {
  asJson() {
    let result = {};
    if (this.routeV) {
      result["route"] = this.routeV;
    }

    let v: any = null;
    if (this.responseFieldInstance) {
      v = this.responseFieldInstance.asJson();
      if (v) {
        result["response"] = v;
      }
    }

    if (this.takeFieldInstance) {
      v = this.takeFieldInstance.asJson();
      if (v) {
        result["take"] = v;
      }
    }

    if (this.moduleFunctionInstance) {
      const responseAsJson = this.moduleFunctionInstance.asJson();
      if (responseAsJson) {
        result["run"] = responseAsJson;
      }
    }

    return result;
  }
}

export default WrapperBodyField;
