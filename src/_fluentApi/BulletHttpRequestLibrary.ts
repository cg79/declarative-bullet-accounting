import axios, { AxiosRequestConfig } from "axios";
import { CustomHttpResponse } from "./CustomHttpResponse";
import {
  BulletAuthentication,
  BULLET_ROUTE,
  ChangePasswordRequest,
  ConfirmUserRequest,
  CreateUserRequest,
  DeltaFunctionRequest,
  ForgotPasswordRequest,
  LoginRequest,
  PageRequest,
  RemoveFunctionRequest,
  ResetPasswordRequest,
  DeltaFunction,
  MethodExecutionRequest,
} from "./facade";
import BulletFile from "./BulletFile";
import { BulletKey } from "./key/bulletKey";
import { BulletFiles } from "./BulletFiles";

class BulletHttpRequestLibrary {
  private bulletAuthentication: BulletAuthentication;
  constructor(bulletAuthentication: BulletAuthentication) {
    this.bulletAuthentication = bulletAuthentication;
  }

  getBlobFromUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      callback(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  createBulletKey = (body: BulletKey): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/logged/management`;

    return this.axiosPost(url, body)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  executeMethodFromModule = (
    request: MethodExecutionRequest
  ): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/private/bullet/executeMethodFromModule`;

    return this.axiosPost(url, request)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  createuser = (
    body: CreateUserRequest,
    bulletKey = ""
  ): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/user/createUser`;

    return this.axiosPost(url, body, bulletKey)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  paginatedUsers = (body: PageRequest): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/root/users`;

    return this.axiosPost(url, body)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  paginatedErors = (body: PageRequest): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/root/errors`;

    return this.axiosPost(url, body)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  paginatedFunctions = (body: PageRequest): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/logged-user/functions`;

    return this.axiosPost(url, body)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  registerUpdateFunction = (
    functionRequest: DeltaFunctionRequest
  ): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/root/registerupdatedeltafunction`;

    if (!functionRequest.guid) {
      functionRequest.guid = this.generateGuid();
    }
    const bulletBody = {
      body: functionRequest,
    };
    return this.axiosPost(url, bulletBody)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  testFunction = (
    functionRequest: DeltaFunctionRequest
  ): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/logged-user/executedeltafunction`;

    if (!functionRequest.guid) {
      functionRequest.guid = this.generateGuid();
    }
    const bulletBody = {
      body: functionRequest,
    };
    return this.axiosPost(url, bulletBody)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  forgotpassword = (
    body: ForgotPasswordRequest,
    bulletKey = ""
  ): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/user/forgotPassword`;

    return this.axiosPost(url, body, bulletKey)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  resetpassword = (
    body: ResetPasswordRequest,
    bulletKey = ""
  ): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/user/resetpassword`;

    return this.axiosPost(url, body, bulletKey)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  managementLogin = (body: LoginRequest): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/management/login`;

    return this.axiosPost(url, body)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  getMainDeltaFunctions = (): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/root/getMainDeltaFunctions`;

    return this.axiosPost(url, {})
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  registerUpdateMainDeltaFunction = (
    body: DeltaFunction,
    bulletKey = ""
  ): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/root/registerUpdateMainDeltaFunction`;

    return this.axiosPost(url, body, bulletKey)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };
  login = (body: LoginRequest, bulletKey = ""): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/user/login`;

    return this.axiosPost(url, body, bulletKey)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  changepassword = (
    body: ChangePasswordRequest
  ): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/logged-user/changePassword`;

    return this.axiosPost(url, body)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  delete = (): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/logged-user/delete`;

    return this.axiosPost(url, {})
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  confirmUser = (
    body: ConfirmUserRequest,
    bulletKey = ""
  ): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/user/confirm`;

    return this.axiosPost(url, body, bulletKey)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  // registerupdatedeltafunction = (
  //   body: DeltaFunctionRequest,
  //   version = 'v1'
  // ): Promise<CustomHttpResponse> => {
  //   if (!body.guid) {
  //     body.guid = this.generateGuid();
  //   }
  //   const { serverUrl } = this.bulletAuthentication;
  //   const url = `${serverUrl}/bulletapi/root/registerupdatedeltafunction`;

  //   return this.axiosPost(url, body)
  //     .then((serverResponse) => {
  //       return Promise.resolve(serverResponse);
  //     })
  //     .catch((e) => {
  //       return Promise.resolve({
  //         data: null,
  //         success: false,
  //         message: e,
  //       });
  //     });
  // };

  removedeltafunction = (
    body: RemoveFunctionRequest
  ): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/root/removedeltafunction`;

    return this.axiosPost(url, body)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  executedeltafunction = (
    body: DeltaFunctionRequest
  ): Promise<CustomHttpResponse> => {
    if (!body.guid) {
      body.guid = this.generateGuid();
    }
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}/bulletapi/logged-user/executedeltafunction`;

    return this.axiosPost(url, body)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  sendApiRequest = (body): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;

    return this.axiosPost(serverUrl, body)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  sendBulletFilesApiRequest = (
    body: any,
    fileList: BulletFile[]
  ): Promise<any> => {
    const { serverUrl } = this.bulletAuthentication;
    const url = `${serverUrl}${BULLET_ROUTE}`;

    // const formFiles: FormData = new FormData();

    // fileList.forEach((iFile) => {
    //   iFile.addFileToForm(formFiles);
    // });

    // const deletedFiles = [];
    // fileList
    //   .filter((el) => el.status === IFileStatus.DeletedFile)
    //   .forEach((el: BulletFile) =>
    //     deletedFiles.push({
    //       guid: el.key,
    //       filePath: el.bucket,
    //     })
    //   );

    // const replacedFiles = [];
    // fileList
    //   .filter((el) => el.status === IFileStatus.ReplacedFile)
    //   .forEach((el) =>
    //     replacedFiles.push({
    //       guid: el.key,
    //       filePath: el.bucket,
    //     })
    //   );

    const formFiles = new BulletFiles().createFormData(fileList, body);

    // const fileOptions: FileOptions = new FileOptions();
    // fileOptions.deletedFiles = deletedFiles;
    // // fileOptions.replacedFiles = replacedFiles;
    // fileOptions.storage = body.storage;

    // formFiles.append(
    //   'data',
    //   JSON.stringify({
    //     body,
    //     fileOptions,
    //   })
    // );

    return this.axiosPost(url, formFiles);
  };

  sendBulletApiRequest = (body: any): Promise<CustomHttpResponse> => {
    const { serverUrl } = this.bulletAuthentication;

    const url = `${serverUrl}${BULLET_ROUTE}`;

    return this.axiosPost(url, body)
      .then((serverResponse) => {
        return Promise.resolve(serverResponse);
      })
      .catch((e) => {
        return Promise.resolve({
          data: null,
          success: false,
          message: e,
        });
      });
  };

  axiosPost = async (
    url,
    body,
    bulletKey = ""
  ): Promise<CustomHttpResponse> => {
    const headers = {
      headers: this.createHeader(bulletKey),
    };

    try {
      const axiosResponse = await axios.post(url, body, headers);
      return new CustomHttpResponse(axiosResponse.data);
    } catch (error: any) {
      const er: any = {};
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        er.data = error.response.data;
        er.status = error.response.status;
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        er.request = error.request;
      } else {
        er.message = error.message;
      }
      return new CustomHttpResponse({
        error: 1,
        message: er,
      });
    }
  };

  private createHeader = (bulletKey: string): any => {
    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: this.bulletAuthentication.authentication,
      bulletkey: bulletKey || "",
    };
    return headers;
  };

  generateGuid = () => {
    var u = "",
      i = 0;
    while (i++ < 36) {
      var c = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"[i - 1],
        r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      u += c == "-" || c == "4" ? c : v.toString(16);
    }
    return u;
  };
}

export default BulletHttpRequestLibrary;
