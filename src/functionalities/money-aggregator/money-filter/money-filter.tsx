import { useBetween } from "use-between";
import { LabelDropDown } from "../../../_components/reuse/LabelDropDown";
import useMoneyAccounts from "../money-account/hooks/useMoneyAccounts";
import {
  ACCOUNT_TYPE_VALUE,
  IMoneyAccount,
} from "../money-account/money-account-type";
import DateStartEnd from "../../../_components/reuse/date/date-start-end";
import useMoneyTransactionsFilter from "../money-transactions/hooks/useMoneyTransactionsFilter";
import AcceptedInvitations from "../entity-invitations/accepted-invitations/accepted-invitations";
import { Panel } from "primereact/panel";

const MoneyFilter = () => {
  const { accounts, accountsLoaded, selectedAccount, setSelectedAccount } =
    useBetween(useMoneyAccounts);

  const {
    startDate,
    updateStartDate,
    endDate,
    updateEndDate,
    aggregationFilterBy,
  } = useBetween(useMoneyTransactionsFilter);

  const accountsWithDefaultValue: IMoneyAccount[] = [
    {
      _id: "",
      name: "--DEFAULT--",
      amount: 0,
      date: 0,
      account_type: ACCOUNT_TYPE_VALUE.ALL,
      description: "",
      userid: "",
      nick: "",
    },
    ...(accounts || []),
  ];

  return (
    <>
      <div className="fcenter">
        <Panel header="FIltre" toggleable>
          <div className="flex mt10">
            <LabelDropDown
              label={"Cont: "}
              className=""
              lwidth="135px"
              onChange={(accountValue: IMoneyAccount) => {
                const account = accountsWithDefaultValue.find(
                  (a) => a._id === accountValue._id
                );
                setSelectedAccount(account);
              }}
              options={accountsWithDefaultValue}
              value={selectedAccount}
              optionLabel="name"
              optionValue="_id"
            ></LabelDropDown>
          </div>

          <div className="flex mt10">
            <AcceptedInvitations></AcceptedInvitations>
          </div>

          <div className="fcenter3">
            <DateStartEnd
              startDate={startDate}
              endDate={endDate}
              onStartDate={(val) => {
                updateStartDate(val);
                console.log(accounts);
              }}
              onEndDate={updateEndDate}
            ></DateStartEnd>
          </div>
        </Panel>
      </div>
    </>
  );
};

export default MoneyFilter;
