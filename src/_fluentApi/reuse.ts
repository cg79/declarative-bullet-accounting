import WrapperBodyField from "./fluent/wrapper-body-field";
import WrapperModuleFunction from "./fluent/wrapper-module-function";
import WrapperPage from "./fluent/wrapper-page";

class Reuse {
  createSortObject(sortList) {
    if (!sortList || !sortList.length) {
      return null;
    }
    const sortObj = {};
    sortList.forEach(
      (el) => (sortObj[el.fieldValue] = el.ascendingValue ? 1 : -1)
    );
    return sortObj;
  }

  createBodyFields(bodyFields: { key: string; instance: WrapperBodyField }[]) {
    const response = {};
    if (bodyFields) {
      bodyFields.forEach((el) => {
        response[el.key] = el.instance.asJson();
      });
    }
    return Object.keys(response).length ? response : null;
  }

  includePage(pageInstance: WrapperPage | null) {
    if (!pageInstance) {
      return null;
    }
    return pageInstance.asJson();
  }
}

export default new Reuse();
