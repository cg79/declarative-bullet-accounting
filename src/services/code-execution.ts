export type DeltaFunction = {
  functiontext: string;
  guid: string;
  module: string;
  method: string;
};

class CodeExecutionService {
  executeDelta(delta: DeltaFunction, parameter: any) {
    try {
      const newCode = `
        ${delta.functiontext}

        return ${delta.method};  
        // return ${delta.method}.apply(null, [${parameter}])
      `;

      console.log(newCode);

      // eslint-disable-next-line no-new-func
      var anonimousScriptFunc = new Function(newCode);
      var func = anonimousScriptFunc();

      const funcResult = func.apply(null, [parameter]);

      return { response: funcResult, success: true };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  }
}

const instance = new CodeExecutionService();
export default instance;
