import axios, { AxiosRequestConfig } from "axios";
import { CustomHttpResponse } from "./CustomHttpResponse";

class AxiosWrapper {
  createHeader: Function;
  constructor(createHeader: Function) {
    this.createHeader = createHeader;
  }
  axiosPost = async (url, body): Promise<CustomHttpResponse> => {
    const headers = {
      headers: this.createHeader(),
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

  // private createHeader = (): any => {
  //   const headers = {
  //     'Content-Type': 'application/json;charset=UTF-8',
  //     Authorization: this.bulletAuthentication.authentication,
  //   };
  //   return headers;
  // };

  // generateGuid = () => {
  //   var u = '',
  //     i = 0;
  //   while (i++ < 36) {
  //     var c = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i - 1],
  //       r = (Math.random() * 16) | 0,
  //       v = c == 'x' ? r : (r & 0x3) | 0x8;
  //     u += c == '-' || c == '4' ? c : v.toString(16);
  //   }
  //   return u;
  // };
}

export default AxiosWrapper;
