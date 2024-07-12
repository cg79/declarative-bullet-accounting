class Sort {
  protected fieldV = '';
  field(value: string) {
    this.fieldV = value;
    return this;
  }

  protected ascendingV = true;
  ascending(value: boolean) {
    this.ascendingV = value;
    return this;
  }
}

export default Sort;
