import Page from './Page';
import WrapperFlow from './wrapper-flow';

class WrapperPage extends Page {
  asJson() {
    const response = {};
    response['itemsOnPage'] = this.itemsOnPageV;
    response['pageNo'] = this.pageNoV;

    // const flowListLength = this.flowList.length;
    // if (flowListLength) {
    //   if (flowListLength === 1) {
    //     response['flow'] = this.flowList[0].asJson();
    //   } else {
    //     const jsFlows = [];
    //     this.flowList.forEach((el: WrapperFlow) => jsFlows.push(el.asJson()));
    //     response['flow'] = jsFlows;
    //   }
    // }

    if(this.repeatValue) {
      response['repeat'] = true;
    }


    return response;
  }
}

export default WrapperPage;
