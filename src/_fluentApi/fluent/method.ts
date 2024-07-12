
export type MethodType = (x: Method) => Method;
class Method {
  protected methodV = '';
  method(value: string) {
    this.methodV = value;
    return this;
  }
}

export default Method;
