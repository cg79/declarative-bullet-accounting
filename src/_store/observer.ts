class Observer {
  handlers: any = {};

  subscribe(eventName: string, func: Function) {
    let handlerMap = this.handlers[eventName];
    if (!handlerMap) {
      this.handlers[eventName] = [];
      handlerMap = this.handlers[eventName];
    }

    // const x = {
    //   'LOGS': []
    // }
    handlerMap.push(func);
  }

  unSubscribe(eventName: string, instance: any) {
    const handlerMap = this.handlers[eventName];
    if (!handlerMap) {
      return;
    }
    handlerMap.delete(instance);
  }

  publish(eventName: string, data: any = null) {
    const handlerMap = this.handlers[eventName];
    if (!handlerMap) {
      return;
    }
    handlerMap.forEach((funcValue: Function) => {
      funcValue(data);
    });
  }
}

const instance = new Observer();
export default instance;
