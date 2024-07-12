import IFile from "../BulletFile";
import { STORAGE_PROVIDER } from "./constants";
import { CollectionType } from "./fluent-bullet-base";
import WrapperCollection from "./wrapper-collection";
class BulletStorage {
  protected directoryV = "";

  protected providerV = STORAGE_PROVIDER.GOOGLE;

  bucket(value: string) {
    this.directoryV = value;
    return this;
  }

  protected keyV = "";
  key(value: string) {
    this.keyV = value;
    return this;
  }

  provider(value: STORAGE_PROVIDER) {
    this.providerV = value;
    return this;
  }

  protected fileList: IFile[] = [];
  addFile(iFile: IFile) {
    this.fileList.push(iFile);
    return this;
  }

  addFiles(files: IFile[]) {
    files.forEach((element) => {
      this.fileList.push(element);
    });

    return this;
  }

  protected _collection: WrapperCollection | null = null;
  collection(builder: CollectionType): BulletStorage {
    const inst = new WrapperCollection();
    builder(inst);

    this._collection = inst;
    return this;
  }
}

export default BulletStorage;
