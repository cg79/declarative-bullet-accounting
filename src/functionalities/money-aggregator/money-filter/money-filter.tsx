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
import LabelRadioButtonList from '../../../_components/reuse/LabelRadioButtonList';
import MyIcon from '../../../_components/reuse/my-icon';
import useTranslations from '../../translations/useTranslations';
import { utils } from '../../../_utils/utils';
import CheckBoxList from '../../../_components/reuse/checkbox-list';
import MoneyUsers from './money-users';
import { EntityUser } from '../../user/types';

interface IPeriod {
  value: string;
  label: string;
  setFilter?: () => void;
}

const MoneyFilter = ({ users }: { users: EntityUser[] }) => {
  const { currentTranslation } = useBetween(useTranslations);
  const { accounts, selectedAccount, setSelectedAccount } =
    useBetween(useMoneyAccounts);

  const { shortcutKey, setShortcutKey } = useBetween(useShortcut);

  const {
    startDate,
    updateStartDate,
    endDate,
    updateEndDate,
    filterBy,
    setSelectedUsers,
  } = useBetween(useMoneyTransactionsFilter);

  const [period, setPeriod] = useState<IPeriod | null>();
  const [showFilters, setShowFilters] = useState(false);

  const periods: IPeriod[] = [
    {
      value: 'day',
      label: 'Today',
      setFilter: () => {
        updateStartDate(utils.getStartOfTodayAsEpoch());
        updateEndDate(null);
      },
    },
    {
      value: 'week',
      label: 'This Week',

      setFilter: () => {
        const startDate = utils.getStartOfWeekAsEpoch();
        updateStartDate(startDate);
        updateEndDate(null);
      },
    },
    {
      value: '2weeks',
      label: 'Last 2 Weeks',

      setFilter: () => {
        const startDate = utils.getStartOfWeekAsEpoch(-1);
        updateStartDate(startDate);
        updateEndDate(null);
      },
    },
    {
      value: 'month',
      label: 'This Month',

      setFilter: () => {
        const startDate = utils.getStartOfMonthAsEpoch();
        updateStartDate(startDate);
        updateEndDate(null);
      },
    },
    {
      value: '2months',
      label: 'Last 2 Months',

      setFilter: () => {
        const startDate = utils.getStartOfMonthAsEpoch(-1);
        updateStartDate(startDate);
        updateEndDate(null);
      },
    },
    {
      value: 'quarter',
      label: 'Quarter',

      setFilter: () => {
        const startDate = utils.getStartOfQuarterAsEpoch();
        updateStartDate(startDate);
        updateEndDate(null);
      },
    },
    {
      value: 'year',
      label: 'Year',

      setFilter: () => {
        const startDate = utils.getStartOfYearAsEpoch();
        updateStartDate(startDate);
        updateEndDate(null);
      },
    },
    {
      value: 'custom',
      label: 'Custom',

      setFilter: () => {
        setShowFilters(true);
      },
    },
  ];

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

  const moneyTransactionOptionTemplate = (
    option: IPeriod,
    onClick,
    checked
  ) => {
    const css = checked ? 'rbspan selected' : 'rbspan shadow';
    return (
      <span className={css} key={option.value} onClick={onClick}>
        {option.label}
      </span>
    );
  };

  return (
    <>
      {/* <div className="fcenter">
        <MyButton
          text={showFilters ? 'Ascunde Filtre' : 'Arata Filtre 4'}
          onClick={() => {
            toggleFilters();
          }}
          useBaseButton={false}
          className="mt10 linkbutton"
        ></MyButton>
      </div> */}
      <div className="fcenter mt10 " style={{ marginTop: '50px' }}>
        <LabelRadioButtonList
          renderOption={moneyTransactionOptionTemplate}
          label=""
          lwidth="135px"
          selectedValue={period?.value}
          options={periods}
          // itemTemplate={moneyTransactionOptionTemplate}
          onChange={(val) => {
            const period = periods.find((p) => p.value === val);
            period?.setFilter?.();
            setPeriod(period);
          }}
          name="type"
          labelField="label"
          valueField="value"
        ></LabelRadioButtonList>
      </div>
      <div className="fcenter mt10">
        <MoneyUsers
          options={users}
          onItemsSelected={(selectedUsers) => {
            setSelectedUsers(selectedUsers);
          }}
        ></MoneyUsers>
        {/* <AcceptedInvitations></AcceptedInvitations> */}
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

            <div className="fcenter3 mt10">
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
