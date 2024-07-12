import IFile from '../BulletFile';
import BulletStorage from './bullet-storage';
class WrapperStorage extends BulletStorage {
  asJson() {
    const result = {};
    result['bucket'] = this.directoryV;
    result['provider'] = this.providerV;

    if (this._collection) {
      result['collection'] = this._collection.asJson();
    }
    if (this.keyV) {
      result['key'] = this.keyV;
    }
    return result;
  }

  get files(): IFile[] {
    return this.fileList;
  }
}

export default WrapperStorage;
