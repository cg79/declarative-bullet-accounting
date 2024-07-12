class TakeKey {
  protected fromV = '';
  protected intoV = '';

  from(value: string) {
    this.fromV = value;
    return this;
  }

  into(value: string) {
    this.intoV = value;
    return this;
  }

  protected excludeV = '';
  exclude(value: string) {
    this.excludeV = value;
    return this;
  }
}

export default TakeKey;
