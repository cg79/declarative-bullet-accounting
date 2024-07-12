class Find {
  protected regexV = null;
  regex(value: any) {
    if (typeof value == 'string') {
      throw new Error(
        'plase provide an object for the regex. e.g. {name: "^clau" }'
      );
    }
    this.regexV = value;
    return this;
  }

  protected expressionV = '';
  expression(value: string) {
    this.expressionV = value;
    return this;
  }

  protected findV = null;
  findByObject(value: any) {
    this.findV = value;
    return this;
  }

  protected inV = null;
  in(value: any) {
    if (typeof value == 'string') {
      throw new Error(
        'plase provide an object for the in. e.g. {name: ["john", "alex"] }'
      );
    }
    this.inV = value;
    return this;
  }
}

export default Find;
