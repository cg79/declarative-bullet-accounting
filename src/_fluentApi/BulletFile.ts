import { IFileStatus } from "./fluent/constants";

// class used to store the information related to a file
class BulletFile {
  //File object: https://developer.mozilla.org/en-US/docs/Web/API/File
  fileContent: File | null = null;

  status: IFileStatus = IFileStatus.FreeSlot;

  bucket = "";

  originalFileName = "";
  name = "";

  url = "";

  accept = "*.*";

  changed = false;
  guid: string | null = null;

  constructor(obj: any = null) {
    if (!obj) {
      return;
    }

    const { guid, fileContent, bucket, name, url } = obj;

    this.guid = guid;
    this.bucket = bucket;
    this.name = name || "";
    this.url = url || "";

    this.status = IFileStatus.FreeSlot;

    if (fileContent) {
      this.setFile(fileContent);
      this.originalFileName = this.name || fileContent.name || "";
      this.status = IFileStatus.ExistentFile;
    }
  }

  updateUrl(serverUrl: string, prefix: string, bucket: string, name: string) {
    this.url = `${serverUrl}/${prefix}/${bucket}/${name}`;
  }

  setFile(file: File) {
    if (!file) {
      return;
    }
    this.fileContent = file;
    if (this.status === IFileStatus.ExistentFile) {
      this.originalFileName = this.nameValue || "";
      this.status = IFileStatus.ReplacedFile;

      return;
    }
    this.status = IFileStatus.AddedFile;
  }

  get nameValue() {
    return this.name || this.originalFileName || this.fileContent?.name;
  }

  markForDeletion() {
    this.fileContent = null;
    if (this.status === IFileStatus.ExistentFile) {
      this.status = IFileStatus.DeletedFile;
      return;
    }
    this.status = IFileStatus.FreeSlot;
  }

  addFileToForm = (formInstance: FormData) => {
    const { fileContent, status, guid } = this;
    if (!fileContent) {
      return false;
    }

    if (
      status !== IFileStatus.AddedFile &&
      status !== IFileStatus.ReplacedFile
    ) {
      return false;
    }

    const key = guid || this.nameValue || "";

    formInstance.append(key, fileContent, this.nameValue);

    return true;
  };

  shouldBeSaved() {
    return (
      this.status === IFileStatus.AddedFile ||
      this.status === IFileStatus.ReplacedFile
    );
  }

  hasContent() {
    return (
      (this.fileContent || this.url) &&
      (this.status == IFileStatus.AddedFile ||
        this.status == IFileStatus.ExistentFile ||
        this.status == IFileStatus.ReplacedFile)
    );
  }

  // get nameValue() {
  //   if (this.name) {
  //     return this.name;
  //   }

  //   if (this.originalFileName) {
  //     return this.originalFileName;
  //   }

  //   if (!this.fileContent) {
  //     return null;
  //   }
  //   return this.fileContent.name;
  // }
}

export default BulletFile;
