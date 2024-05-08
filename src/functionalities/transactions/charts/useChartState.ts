import React from "react";
import { chartDatasets } from "../constants/accounting_constants";
import { formatDate } from "../helpers/accounting_helpers";

export function useChartState() {
  const [chartData, setChartData] = React.useState<null | any>(null);

  const setChartingAccountingResponse = (records: any[]) => {
    processAccountingResponse(records);
  };

  const processAccountingResponse = (records: any[]) => {
    let temp = {};
    const chartItems = records.map((el: any) => {
      temp = {
        ...el.trace.newConta,
        addedms: el.addedms,
      };
      return temp;
    });

    const readElement = (el: number) => {
      return Math.round(el);
    };
    const pensie = chartItems.map((el: any) => readElement(el.taxe.pensie));
    const taxa_profit = chartItems.map((el: any) =>
      readElement(el.taxe.taxa_profit)
    );
    const tva = chartItems.map((el: any) => readElement(el.taxe.tva));
    const tva_deductibil = chartItems.map((el: any) =>
      readElement(el.taxe.tva_deductibil)
    );
    const sanatate = chartItems.map((el: any) => readElement(el.taxe.sanatate));
    const munca = chartItems.map((el: any) => readElement(el.taxe.munca));
    const dividende = chartItems.map((el: any) =>
      readElement(el.taxe.dividende)
    );
    const salar = chartItems.map((el: any) => readElement(el.salar.value));
    const totalTaxe = chartItems.map((el: any) => readElement(el.taxe.total));
    const casaFirma = chartItems.map((el: any) => readElement(el.casa.firma));
    const disponibil = chartItems.map((el: any) =>
      readElement(el.casa.disponibil)
    );

    // const salarFirma = chartItems.map((el: any) => el.casa.firma);

    const personalAccountData = chartItems.map(
      (el: any) => el.personal_account
    );

    const chartData = {
      labels: chartItems.map((el: any) => formatDate(new Date(el.addedms))),
      datasets: chartDatasets({
        pensie,
        sanatate,
        munca,
        dividende,
        taxa_profit,
        tva,
        tva_deductibil,
        salar,
        totalTaxe,
        personalAccountData,
        casaFirma,
        disponibil,
      }),
    };

    console.log(chartData);
    setChartData(chartData);
  };

  return { chartData, setChartingAccountingResponse };
}
