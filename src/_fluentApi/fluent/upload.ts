//not used
class Upload {
  protected directoryV = '';
  directory(value: string) {
    this.directoryV = value;
    return this;
  }

  protected providerV = '';
  provider(value: string) {
    this.providerV = value;
    return this;
  }
}

export default Upload;
