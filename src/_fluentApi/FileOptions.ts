import { IStorageProvider } from "./fluent/constants";
import BulletFile from "./BulletFile";

class FileOptions {
  storage?: IStorageProvider;

  deletedFiles: BulletFile[] | null = null;
  // replacedFiles: BulletFile[] = null;
}

export default FileOptions;
