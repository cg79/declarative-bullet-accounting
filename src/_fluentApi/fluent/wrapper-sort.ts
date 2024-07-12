import Sort from './Sort';

class WrapperSort extends Sort {
  get fieldValue() {
    return this.fieldV;
  }

  get ascendingValue() {
    return this.ascendingV;
  }
}

export default WrapperSort;
