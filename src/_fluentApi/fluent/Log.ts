class Log {
  protected collectionV = '';
  collection(value: string) {
    this.collectionV = value;
    return this;
  }

  protected descriptionV = '';
  description(value: string) {
    this.descriptionV = value;
    return this;
  }

  protected routeV = '';
  route(value: string) {
    this.routeV = value;
    return this;
  }
}

export default Log;
