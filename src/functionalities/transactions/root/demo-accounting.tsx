import "react-dropdown/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { TabView, TabPanel } from "primereact/tabview";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { TransactionRecords } from "../list/transaction-records";

import { useTransactions } from "../hook/useTransactions";

import { PaginationWrapper } from "../../../_components/reuse/PaginationWrapper";
import { AddTransaction } from "../add/add-transaction";
import { FirmeAngajatiDropDown } from "../../employee/dropdown/firme-angajati-dropdown";
// import { useEffect, useState } from "react";
import { MyButton } from "../../../_components/reuse/my-button";
import { FilterActions } from "../filter/filter-actions";
import useFirme from "../../../_store/useFirme";
import { useBetween } from "use-between";
import { ChartGraph } from "../charts/chart-graph";
import { IPageNoAndRowsPerPage } from "../../../hooks/usePagerState";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const DemoAccounting = () => {
  const { selectedAngajat, firme, reload } = useBetween(useFirme);
  const {
    accountingRecords,
    error,
    pageState,
    goToPage,
    pageCountAndTotalRecords,
    reloadAccountingRecords,
  } = useBetween(useTransactions);

  const [active, setActive] = useState(0);
  const activateTabIndex = (index: number) => {
    if (index !== active) {
      setActive(index);
    }
  };

  return (
    <>
      <TabView
        activeIndex={active}
        onTabChange={(e) => activateTabIndex(e.index)}
      >
        <TabPanel header="Alegeti Firma/Angajat">
          <div className="flex flex1 center">
            <FirmeAngajatiDropDown></FirmeAngajatiDropDown>
          </div>
          {selectedAngajat ? (
            <div className="flex center bold">
              <MyButton
                text="Vizualizare Tranzactii"
                onClick={() => activateTabIndex(1)}
                className="mt10 linkbutton"
                useBaseButton={false}
              ></MyButton>
            </div>
          ) : null}
        </TabPanel>
        <TabPanel header="Tranzactii inregistrate">
          <>
            <div className="flex flex1 flex-column">
              <AddTransaction></AddTransaction>

              <div className="flex">{error}</div>
            </div>
            <div className=" fcenterv ">
              <FilterActions></FilterActions>
            </div>
            <TransactionRecords
              accountingRecords={accountingRecords}
            ></TransactionRecords>
            <div className="flex center">
              <PaginationWrapper
                pageState={pageState}
                pageCountAndTotalRecords={pageCountAndTotalRecords}
                goToPage={(val: IPageNoAndRowsPerPage) => {
                  goToPage(val);
                }}
              ></PaginationWrapper>
            </div>
          </>
        </TabPanel>
        <TabPanel header="Grafic venituri">
          <div className="chart">
            <ChartGraph></ChartGraph>
          </div>
        </TabPanel>
      </TabView>
    </>
  );
};
