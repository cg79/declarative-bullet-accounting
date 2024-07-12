import Log from './Log';
import Trigger from './Trigger';

class WrapperTrigger extends Trigger {
  asJson() {
    const response = {};
    if (this.collectionV) {
      response['collection'] = this.collectionV;
      return response;
    }
    if (this.routeV) {
      response['route'] = this.routeV;
      return response;
    }

    return null;
  }
}

export default WrapperTrigger;
