import Collection from './collection';

class WrapperCollection extends Collection {
  asJson() {
    let response = {};

    if (this.nameV) {
      response['name'] = this.nameV;
    }

    if (this.methodV) {
      response['method'] = this.methodV;
    }
    if (this.useGuidV) {
      response['useGuid'] = true;
    }

    if (this.ownedV) {
      response['owned'] = this.ownedV;
    }

    return response;
  }
}

export default WrapperCollection;
