import Method from "./method";

class WrapperMethod extends Method {
  asJson() {
    const response = {};
    if (this.methodV) {
      response["method"] = this.methodV;
      return response;
    }

    return null;
  }
}

export default WrapperMethod;
