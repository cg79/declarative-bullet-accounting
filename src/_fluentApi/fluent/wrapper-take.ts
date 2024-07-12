import Take from './take';

class WrapperTake extends Take {
  asJson() {
    const response = {};
    if (this.keyV) {
      response['key'] = this.keyV;
    }

    if (this.fieldsV) {
      response['fields'] = this.fieldsV;
    }

    if(this.includeV){
      response['include'] = this.includeV;
    }

    if (this.excludeV) {
      response['exclude'] = this.excludeV;
    }

    if (this.wrapperTraceStart) {
      const traceObj = this.wrapperTraceStart.asJson();
      if (traceObj) {
        response['traceStart'] = traceObj;
      }
    }

    if (this.wrapperTraceEnd) {
      const traceObj = this.wrapperTraceEnd.asJson();
      if (traceObj) {
        response['traceEnd'] = traceObj;
      }
    }

    if (this.moduleFunctionInstance) {
      const responseAsJson = this.moduleFunctionInstance.asJson();
      if (responseAsJson) {
        response['run'] = responseAsJson;
      }
    }

    if (this.selectList.length) {
      const include = {};
      this.selectList.forEach((el) => {
        if (el.excludeV) {
          include[el.intoV] = {
            fields: el.fromV,
            exclude: el.excludeV,
          };
        } else {
          include[el.intoV] = el.fromV;
        }
      });
      response['include'] = include;
    }

    return Object.keys(response) ? response : null;
  }
}

export default WrapperTake;
