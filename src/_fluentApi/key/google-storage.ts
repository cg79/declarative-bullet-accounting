import BulletFile from "../BulletFile";

export class GoogleStorage {
  _id = "";
  keyfilename = "";
  bucketname = "";

  keyFile: BulletFile | null = null;

  constructor(obj: any = {}) {
    this.fill(obj);
  }

  fill(obj: any = {}) {
    const { _id, keyfilename, bucketname } = obj;
    this._id = _id;
    this.keyfilename = keyfilename;
    this.bucketname = bucketname;
    this.keyFile = new BulletFile();
    this.keyFile.accept = ".json";
  }
}
