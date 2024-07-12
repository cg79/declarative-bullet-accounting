import Trace from "./Trace";

class WrapperTrace extends Trace {
  asJson() {
    const response = {};
    if (this.takeFieldInstance) {
      response["take"] = this.takeFieldInstance.asJson();
    }

    if (this.descriptionV) {
      response["description"] = this.descriptionV;
    }

    if (this.routeV) {
      response["route"] = this.routeV;
      return response;
    }

    if (this.collectionV) {
      response["collection"] = this.collectionV;
      return response;
    }

    return null;
  }
}

export default WrapperTrace;
