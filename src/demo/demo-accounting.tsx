import { BULLET_METHOD } from "declarative-fluent-bullet-api/fluent/constants";
import React, { useEffect } from "react";
import {
  createDeclarativeBulletApi,
  loginBulletIO_01,
} from "../_factory/prerequisites";
import { store } from "../_store/store";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function formatDate(date: Date) {
  // const date = new Date(date);
  const month = "" + (date.getMonth() + 1);
  const day = "" + date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return [day, month, year, hours, minutes].join(".");
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const ACCOUNTING_COLLECTION = "_accounting2";
const ACCOUNTING_HISTORY = "_accounting1_history";
let ACCOUNTING_GUID = "31ef10b0-bab4-77a8-b9db-551e48fa8371";

export const DemoAccounting = () => {
  const [chartData, setChartData] = React.useState<null | any>(null);
  const [accountingInput,setAccountingInput]=React.useState<any>({
    input: 0,
    personal_account: 0,
    pension: 0,
    health: 0,
    dividends: 0,
    salary: 0,
  });

  const [pager, setPager] = React.useState({
    isPreviousDisabled: false,
    isNextDisabled: false,
    pageNo: 1,
    pageCount: 0,
    next: () => {
      pager.pageNo++;
      getHistoryDataFromDb(pager.pageNo);
    },
    previous: () => {
      pager.pageNo--;
      getHistoryDataFromDb(pager.pageNo);
    },
  });

  const setAccountingResponse = (value: any) => {
    debugger;
    pager.isPreviousDisabled = pager.pageNo <= 1;
    pager.isNextDisabled = value.pageNo >= value.pageCount;
    pager.pageCount = value.pageCount;
  };

  const isInputDisabled = () => {
    const { input, personal_account,pension,health,dividends, salary } = accountingInput;
    return input+personal_account+pension+health+dividends+salary === 0;
  }

  const resetAccountingValues = () => {
    accountingInput.input = 0;
    accountingInput.personal_account = 0;
    accountingInput.pension = 0;
    accountingInput.health = 0;
    accountingInput.dividends = 0;
    accountingInput.salary = 0;
    setAccountingInput({ ...accountingInput });
  };

  const getHistoryDataFromDb = async (pageNo = 1) => {
    const apiResponse = await createDeclarativeBulletApi()
      .executeFlowByName("paginated_history")
      .page((p) => p.itemsOnPage(5).pageNo(pageNo))
      .execute({
        beforeSendingRequest: (apiBulletJSON: any) => {
          console.log(JSON.stringify(apiBulletJSON));
        },
      });

    processAccountingResponse(apiResponse.data);
  };

  let temp = null;
  const processAccountingResponse = (accountingResponse: any) => {
    setAccountingResponse(accountingResponse);

    const chartItems = accountingResponse.records.map((el: any) => {
      temp = {
        ...el.trace.newConta,
        addedms: el.addedms,
      };
      return temp;
    });

    const moneyData = chartItems.map((el: any) => el.money);
    const pensionData = chartItems.map((el: any) => el.taxes.pension);
    const healthData = chartItems.map((el: any) => el.taxes.health);
    const dividendsData = chartItems.map((el: any) => el.taxes.dividends);
    const salaryData = chartItems.map((el: any) => el.taxes.salary);
    const personalAccountData = chartItems.map(
      (el: any) => el.personal_account
    );

    const datasets = [
      {
        label: "Money",
        data: moneyData,
        backgroundColor: "rgba(0, 255,60, 0.5)",
      },
      {
        label: "Pension",
        data: pensionData,
        backgroundColor: "rgba(255,0,0, 0.5)",
      },
      {
        label: "Health",
        data: healthData,
        backgroundColor: "rgba(102,0,0, 0.5)",
      },
      {
        label: "Dividends",
        data: dividendsData,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Salary",
        data: salaryData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Personal Account",
        data: personalAccountData,
        backgroundColor: "rgba(53, 102,0, 0.5)",
      },
    ];

    const chartData = {
      labels: chartItems.map((el: any) => formatDate(new Date(el.addedms))),
      datasets,
    };

    console.log(chartData);
    setChartData(chartData);

    console.log(accountingResponse);
  };

  useEffect(() => {
    getHistoryDataFromDb();
  }, []);

  const startAccountingData = {
    guid: ACCOUNTING_GUID,
    money: 0,
    personal_account: 0,
    taxes: {
      pension: 0,
      health: 0,
      dividends: 0,
      salary: 0,
    },
  };

  const setKeyNumericValue = (event: any, key: string) => {
    accountingInput[key] = parseInt(event.target.value) || 0;
    setAccountingInput({ ...accountingInput });
  };

  const checkPrerequisites = async () => {
    let { token } = store.get("BULLET_IO_USER") || {};
    if (!token) {
      token = await loginBulletIO_01();
    }
  };

  const accountingAction = async () => {
    await checkPrerequisites();

    const guid = ACCOUNTING_GUID;

    const accountingResponse = await createDeclarativeBulletApi()
      .findOne(ACCOUNTING_COLLECTION)
      .search((f) => f.findByObject({ guid }))
      .flow((f) =>
        f
          .executeIf((e) =>
            e.moduleFunction((m) => m.module("my_module").method("not_exists"))
          )
          .collection((c) =>
            c.name(ACCOUNTING_COLLECTION).method(BULLET_METHOD.INSERT)
          )
          .body(startAccountingData)
          .flow((f) =>
            f
              .body(accountingInput)
              .mergePreviousResultToFlowBody(true)
              .merge((m) =>
                m
                  .traceStart((t) => t.collection("_merge1"))
                  .module("my_module")
                  .method("accounting1")
              )
              .response((r) =>
                r
                  .fields("newConta")
                  .traceStart((t) => t.collection(ACCOUNTING_HISTORY))
              )
              .flow((f) =>
                f

                  // .mergePreviousResultToFlowBody(true)
                  .updateOne(ACCOUNTING_COLLECTION)
                  .search((f) => f.findByObject({ guid }))
                  .flow((f) =>
                    f
                      .name("paginated_history")
                      .saveForLaterUse(true)
                      .page((p) => p.itemsOnPage(5).pageNo(1))
                      .sort((s) => s.field("addedms").ascending(false))
                      .collection((c) =>
                        c
                          .name(ACCOUNTING_HISTORY)
                          .method(BULLET_METHOD.PAGINATION)
                      )
                      .join((j) =>
                        j
                          .key("user")
                          .with((w) =>
                            w.field("_id").collection((c) => c.name("zsys-users"))
                          )
                          .field("trace.newConta.userid")
                          .response(t=>t.fields("_id,email"))
                          
                      )
                  )
              )
          )
      )
      .execute({
        beforeSendingRequest: (apiBulletJSON: any) => {
          console.log(JSON.stringify(apiBulletJSON));
        },
      });

    processAccountingResponse(accountingResponse.data);

    resetAccountingValues();
  };

  return (
    <div>
      <div className="flex center-h">
        <div className="flex flex-column">
          <label htmlFor="inp" className="inp">
            <input
              type="text"
              id="input"
              placeholder="&nbsp;"
              value={accountingInput.input}
              onChange={(event) => setKeyNumericValue(event, "input")}
            />
            <span className="label">input</span>
            <span className="focus-bg"></span>
          </label>

          <label htmlFor="inp" className="inp mt5">
            <input
              type="text"
              id="input"
              placeholder="&nbsp;"
              value={accountingInput.personal_account}
              onChange={(event) =>
                setKeyNumericValue(event, "personal_account")
              }
            />
            <span className="label">personal_account</span>
            <span className="focus-bg"></span>
          </label>
        </div>
        <div className="flex flex-column">
          <label htmlFor="inp" className="inp mt5">
            <input
              type="text"
              id="input"
              placeholder="&nbsp;"
              value={accountingInput.salary}
              onChange={(event) => setKeyNumericValue(event, "salary")}
            />
            <span className="label">salary</span>
            <span className="focus-bg"></span>
          </label>

          <label htmlFor="inp" className="inp mt5">
            <input
              type="text"
              id="input"
              placeholder="&nbsp;"
              value={accountingInput.pension}
              onChange={(event) => setKeyNumericValue(event, "pension")}
            />
            <span className="label">pension</span>
            <span className="focus-bg"></span>
          </label>
        </div>
        <div className="flex flex-column">
          <label htmlFor="inp" className="inp">
            <input
              type="text"
              id="input"
              placeholder="&nbsp;"
              value={accountingInput.dividends}
              onChange={(event) => setKeyNumericValue(event, "dividends")}
            />
            <span className="label">dividends</span>
            <span className="focus-bg"></span>
          </label>

          <label htmlFor="inp" className="inp">
            <input
              type="text"
              id="input"
              placeholder="&nbsp;"
              value={accountingInput.health}
              onChange={(event) => setKeyNumericValue(event, "health")}
            />
            <span className="label">health</span>
            <span className="focus-bg"></span>
          </label>
        </div>
      </div>

      <div className="flex">
        <div className="flex flex1">&nbsp;</div>
        <div className="flex flex1  flex-column">
          <label htmlFor="inp" className="inp">
            Description
          </label>

          <textarea
            style={{ width: "100%", border: "1px solid black" }}
            placeholder="&nbsp;"
            onChange={(event) => setKeyNumericValue(event, "description")}
          />

          <button
            className="ml5 mt5"
            type="button"
            onClick={() => accountingAction()}
            disabled={isInputDisabled()}
          >
            Accounting Action
          </button>
        </div>
        <div className="flex flex1">&nbsp;</div>
      </div>

      <div className="flex center-h mt5">
        <button
          className=""
          onClick={pager.previous}
          disabled={pager.isPreviousDisabled}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Previous
        </button>

        <button
          className="text-center ml5"
          onClick={pager.next}
          disabled={pager.isNextDisabled}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          &nbsp;&nbsp;&nbsp;Next &nbsp;&nbsp;&nbsp;
        </button>
      </div>

      <div className="flex center-h mt5">
        {pager.pageNo}/{pager.pageCount}
      </div>

      {chartData && (
        <Bar plugins={[ChartDataLabels]} options={options} data={chartData} />
      )}
    </div>
  );
};
