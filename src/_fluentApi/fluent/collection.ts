import { BULLET_METHOD } from './constants';

class Collection {
  protected nameV = '';
  name(value: string) {
    this.nameV = value;
    return this;
  }

  protected ownedV = false;
  owned(value: boolean) {
    this.ownedV = value;
    return this;
  }

  protected useGuidV = false;
  useGuid(value: boolean) {
    this.useGuidV = value;
    return this;
  }

  protected methodV = '';

  method(value: BULLET_METHOD) {
    this.methodV = value;
    return this;
  }
}

export default Collection;
