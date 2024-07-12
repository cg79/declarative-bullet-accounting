

export class CustomHttpResponse {

  success = false;
  data: any = null;
  message = '';

  constructor(obj) {
    this.success = obj.success;
    this.data = obj.data;
    this.message = obj.message;
  }
}
