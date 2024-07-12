import Find from './find';

class WrapperFind extends Find {
  asJson() {
    let response = {};

    if (this.findV) {
      response = this.findV;
    }

    if (this.regexV) {
      response['regex'] = this.regexV;
    }

    if (this.expressionV) {
      response['expression'] = this.expressionV;
    }

    if (this.inV) {
      response['in'] = this.inV;
    }

    return response;
  }

  regexValue() {
    return this.regexV;
  }
  expressionValue() {
    return this.expressionV;
  }
  findObjectValue() {
    return this.findV;
  }
}

export default WrapperFind;
