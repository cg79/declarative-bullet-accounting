import JoinCollection from './join-collection';

class WrapperJoinCollection extends JoinCollection {
  asJson() {
    if (!this._collection) {
      throw new Error('please provide the collection information');
    }
    const response = {
      collection: this._collection.asJson(),
    };
    if (this.fieldV) {
      response['field'] = this.fieldV;
    }
    return response;
  }
}

export default WrapperJoinCollection;
