import ExecuteIf from './execute-if';

class WrapperExecuteIf extends ExecuteIf {
  asJson() {
    if (!this.moduleFunctionInstance) {
      return null;
    }
    const moduleFunctionResult = this.moduleFunctionInstance.asJson();
    if(!moduleFunctionResult){
      return null;
    }

    const response = {};

    response['lamda'] = moduleFunctionResult;

    // response['condition'] = this.conditionV;
    if (this.errorcodeV) {
      response['errorcode'] = this.errorcodeV;
    }

    return response;
  }
}

export default WrapperExecuteIf;
