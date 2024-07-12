import ModuleFunction from "./module-function";

class WrapperModuleFunction extends ModuleFunction {
  asJson() {
    const result = {};
    if (this.moduleV) {
      result["module"] = this.moduleV;
    }
    if (this.methodV) {
      result["method"] = this.methodV;
    }
    if (this.useInternalModule) {
      result["useInternalModule"] = this.useInternalModule;
    }

    if (this.paramV) {
      result["paramValue"] = this.paramV;
    }

    if (this.routeV) {
      result["route"] = this.routeV;
    }

    if (this.wrapperTakeInstance) {
      const takeAsJson = this.wrapperTakeInstance.asJson();
      if (takeAsJson) {
        result["take"] = takeAsJson;
      }
    }

    if (this.responseFieldInstance) {
      const responseAsJson = this.responseFieldInstance.asJson();
      if (responseAsJson) {
        result["response"] = responseAsJson;
      }
    }

    if (this.wrapperTraceStart) {
      const traceObj = this.wrapperTraceStart.asJson();
      if (traceObj) {
        result["traceStart"] = traceObj;
      }
    }

    if (this.wrapperTraceEnd) {
      const traceObj = this.wrapperTraceEnd.asJson();
      if (traceObj) {
        result["traceEnd"] = traceObj;
      }
    }

    return Object.keys(result).length ? result : null;
  }
}

export default WrapperModuleFunction;
