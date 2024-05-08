class Store {
  dict: any = {};

  get(key: string, defaultValue?: any): any {
    return this.dict[key] || defaultValue;
  }

  set(key: string, value: any) {
    this.dict[key] = value;
  }

  remove(key: string) {
    delete this.dict[key];
  }
}

const store = new Store();

export { store };
