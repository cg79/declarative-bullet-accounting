import { BULLET_JOIN_METHOD } from "./constants";
import { CollectionType, PageType } from "./fluent-bullet-base";
import WrapperCollection from "./wrapper-collection";
import WrapperPage from "./wrapper-page";

class JoinCollection {
  protected fieldV = "";
  field(value: string) {
    this.fieldV = value;
    return this;
  }
  protected _collection: WrapperCollection | null = null;
  collection(builder: CollectionType) {
    const inst = new WrapperCollection();
    builder(inst);

    this._collection = inst;
    return this;
  }

  protected pageInstance: WrapperPage | null = null;
  page(builder: PageType) {
    const inst = new WrapperPage(); //
    builder(inst);

    this.pageInstance = inst;

    return this;
  }
}

export default JoinCollection;
