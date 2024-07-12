import StopIf from './stop-if';

class WrapperStopIf extends StopIf {
  asJson() {
    if (!this.moduleFunctionInstance) {
      return null;
    }
    const moduleFunctionResult = this.moduleFunctionInstance.asJson();
    if(!moduleFunctionResult){
      return null;
    }
    const response = {};
    response['run'] = moduleFunctionResult;

    // response['condition'] = this.conditionV;
    if (this.errorcodeV) {
      response['errorcode'] = this.errorcodeV;
    }

    return response;
  }
}

export default WrapperStopIf;
