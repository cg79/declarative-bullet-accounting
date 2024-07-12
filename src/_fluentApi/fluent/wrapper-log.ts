import Log from './Log';

class WrapperLog extends Log {
  asJson() {
    const response = {};
    if (this.collectionV) {
      response['collection'] = this.collectionV;
      return response;
    }

    if (this.descriptionV) {
      response['description'] = this.descriptionV;
      return response;
    }
    
    if (this.routeV) {
      response['route'] = this.routeV;
      return response;
    }

    return null;
  }
}

export default WrapperLog;
