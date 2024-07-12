import BulletFlowApi from "./bullet-flow";

class WrapperFlow extends BulletFlowApi {
  specificFlowPropsAsJson() {
    const request = {};

    if (this.wrapperStopIf) {
      const cond = this.wrapperStopIf.asJson();
      if (cond) {
        request["stopIf"] = cond;
      }
    }

    if (this.wrapperExecuteIf) {
      const cond = this.wrapperExecuteIf.asJson();
      if (cond) {
        request["executeIf"] = cond;
      }
    }
    return request;
  }

  asJson() {
    const response: any = {
      ...this.specificFlowPropsAsJson(),
      ...this.asJsonBase(),
    };

    const flowListLength = this.flowList.length;
    if (flowListLength) {
      if (flowListLength === 1) {
        response.flow = this.flowList[0].asJson();
      } else {
        const jsFlows: any[] = [];
        this.flowList.forEach((el: WrapperFlow) => jsFlows.push(el.asJson()));
        response.flow = jsFlows;
      }
    }

    return response;
  }
}

export default WrapperFlow;
