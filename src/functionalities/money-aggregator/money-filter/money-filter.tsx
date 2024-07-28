import { LabelDropDown } from '../../../_components/reuse/LabelDropDown';
import useMoneyAccounts from '../money-account/hooks/useMoneyAccounts';
import {
  ACCOUNT_TYPE_VALUE,
  IMoneyAccount,
} from '../money-account/money-account-type';
import DateStartEnd from '../../../_components/reuse/date/date-start-end';
import useMoneyTransactionsFilter from '../money-transactions/hooks/useMoneyTransactionsFilter';
import AcceptedInvitations from '../entity-invitations/accepted-invitations/accepted-invitations';
import { useEffect, useState } from 'react';
import { DialogWrapper } from '../../../_components/reuse/DialogWrapper';
import { MyButton } from '../../../_components/reuse/my-button';
import { useBetween } from '../../../hooks/useBetween';
import { SHORTCUT_ACTIONS } from '../categories/constants';
import useShortcut from '../categories/shortcut/useShortcut';

const MoneyFilter = () => {
  const { accounts, accountsLoaded, selectedAccount, setSelectedAccount } =
    useBetween(useMoneyAccounts);

  const { shortcutKey, setShortcutKey } = useBetween(useShortcut);

  const [showFilters, setShowFilters] = useState(false);
  const {
    startDate,
    updateStartDate,
    endDate,
    updateEndDate,
    aggregationFilterBy,
  } = useBetween(useMoneyTransactionsFilter);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const accountsWithDefaultValue: IMoneyAccount[] = [
    {
      _id: '',
      name: '--DEFAULT--',
      amount: 0,
      date: 0,
      account_type: ACCOUNT_TYPE_VALUE.ALL,
      description: '',
      userid: '',
      nick: '',
    },
    ...(accounts || []),
  ];

  useEffect(() => {
    if (shortcutKey === SHORTCUT_ACTIONS.FILTERS) {
      setShortcutKey('');
      setShowFilters(true);
    }
  }, [shortcutKey]);
  return (
    <>
      <div className="fcenter">
        <MyButton
          text={showFilters ? 'Ascunde Filtre' : 'Arata Filtre'}
          onClick={() => {
            toggleFilters();
          }}
          useBaseButton={false}
          className="mt10 linkbutton"
        ></MyButton>
      </div>

      {showFilters && (
        <DialogWrapper
          header="Filtre"
          visible={showFilters}
          // style={{ width: "80vw" }}
          onHide={() => setShowFilters(false)}
        >
          <div className="fcenter1">
            <div className="flex mt10">
              <AcceptedInvitations></AcceptedInvitations>
            </div>

            <div className="flex mt10">
              <LabelDropDown
                label={'Cont: '}
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
          </div>
        </DialogWrapper>
      )}
    </>
  );
};

export default MoneyFilter;
