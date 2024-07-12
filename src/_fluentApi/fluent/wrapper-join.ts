import Join from "./join";

class WrapperJoin extends Join {
  buildtake() {
    const response = {};
    // this.takes.forEach(el=> response[el.asJson])
    return Object.keys(response) ? response : null;
  }

  private includeSort() {
    if (!this.sortList || !this.sortList.length) {
      return null;
    }
    const sortObj = {};
    this.sortList.forEach(
      (el) => (sortObj[el.fieldValue] = el.ascendingValue ? 1 : -1)
    );
    return sortObj;
  }

  private includePage() {
    if (!this.pageInstance) {
      return null;
    }
    return this.pageInstance.asJson();
  }

  asJson() {
    if (!this.joinInstance) {
      return null;
    }
    const result = {};
    if (this.fieldV) {
      result["field"] = this.fieldV;
    }
    if (this.keyV) {
      result["key"] = this.keyV;
    }

    const withV = this.joinInstance.asJson();
    if (withV) {
      result["with"] = withV;
    }

    if (this.wrapperResponse) {
      const takeResult = this.wrapperResponse.asJson();
      if (takeResult) {
        result["response"] = takeResult;
      }
    }

    const sort = this.includeSort();
    if (sort) {
      result["sort"] = sort;
    }

    const page = this.includePage();
    if (page) {
      result["page"] = page;
    }

    if (this.joinList && this.joinList.length) {
      const joins: any[] = [];
      let joinObj: any = null;
      this.joinList.forEach((el) => {
        joinObj = el.asJson();
        joins.push(joinObj);
      });
      result["join"] = joins;
    }

    return result;
  }
}

export default WrapperJoin;
