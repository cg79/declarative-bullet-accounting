import BulletFile from "./BulletFile";
import FileOptions from "./FileOptions";
import { IFileStatus } from "./fluent/constants";

export class BulletFiles {
  pictures: BulletFile[] = [];

  createFormData(bulletFiles: BulletFile[], body: any = {}) {
    const formFiles: FormData = new FormData();
    const deletedFiles: any[] = [];
    let fileName = "";

    for (let i = 0; i < bulletFiles.length; i++) {
      const imageFile = bulletFiles[i];
      if (!imageFile) {
        throw new Error("bulletFiles values should be not null or undefined");
      }

      switch (imageFile.status) {
        case IFileStatus.ReplacedFile: {
          imageFile.addFileToForm(formFiles);

          if (imageFile.originalFileName) {
            deletedFiles.push({
              bucket: imageFile.bucket,
              name: imageFile.originalFileName,
            });
          }
          break;
        }
        case IFileStatus.AddedFile: {
          imageFile.addFileToForm(formFiles);
          break;
        }
        case IFileStatus.DeletedFile: {
          fileName = imageFile.originalFileName || imageFile.nameValue || "";
          deletedFiles.push({
            bucket: imageFile.bucket,
            name: fileName,
          });
          break;
        }
        default: {
          break;
        }
      }
    }

    const fileOptions: FileOptions = new FileOptions();
    fileOptions.deletedFiles = deletedFiles;

    body.fileOptions = fileOptions;

    formFiles.append("data", JSON.stringify(body));

    return formFiles;
  }

  createSlot() {
    this.pictures.push(new BulletFile());
  }

  addBulletFile(obj: BulletFile | any) {
    if (obj instanceof BulletFile) {
      this.pictures.push(obj);
      return;
    }
    this.pictures.push(new BulletFile(obj));
  }

  loadBulletFiles(arr: BulletFile[] | any[]) {
    arr.forEach((el) => this.addBulletFile(el));
  }
}
