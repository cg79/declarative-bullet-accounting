import PubSub from "./PubSub";

class Helper {
  // promiseDelay(seconds = 1000) {
  //   return new Promise((res, rej) => {
  //     const timerId = setTimeout(() => {
  //       clearTimeout(timerId);
  //       console.log("delay ", new Date());
  //       res(2);
  //     }, 2000);
  //   });
  // }

  executeFunction(funcRef: Function, value: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(funcRef(value));
      }, 100);
    });
  }

  checkHttpResponseForErrors(response: any) {
    if (!response.success) {
      PubSub.publish("onError", response.message);
    }
  }

  isValidEmail(email: string): boolean {
    // Define the regular expression pattern for a valid email address
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Test the email against the pattern
    return emailPattern.test(email);
  }

  getBlobFromUrl(url: string, callback: Function) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      callback(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }
}

const helpers = new Helper();

export { helpers };
