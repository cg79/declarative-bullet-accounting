class Trigger {
  protected collectionV = '';
  collection(value: string) {
    this.collectionV = value;
    return this;
  }

  protected routeV = '';
  route(value: string) {
    this.routeV = value;
    return this;
  }
}

export default Trigger;
