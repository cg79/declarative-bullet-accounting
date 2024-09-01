import { MyButton } from '../../../../_components/reuse/my-button';
import { ICategory } from '../../categories/category-type';
import useEvents from '../../../../_store/useEvents';
import { useEffect, useState } from 'react';
import {
  IMoneyTransaction,
  moneyTransactionOptionTypes,
  IMoneyTransactionType,
} from '../money-transaction-type';
import { LabelNumericInput } from '../../../../_components/reuse/LabelNumericInput';
import { LabelDate } from '../../../../_components/reuse/LabelDate';
import { LabelDropDown } from '../../../../_components/reuse/LabelDropDown';
import useMoneyAccounts from '../../money-account/hooks/useMoneyAccounts';
import { IMoneyAccount } from '../../money-account/money-account-type';
import { WysYWYG } from '../../../../_components/reuse/my-wysywyg';
import MyIcon from '../../../../_components/reuse/my-icon';
import { utils } from '../../../../_utils/utils';
import LabelRadioButtonList from '../../../../_components/reuse/LabelRadioButtonList';
import { useBetween } from '../../../../hooks/useBetween';
import './add-edit.css';
import useTranslations from '../../../translations/useTranslations';
import useCategoryState from '../../categories/hooks/useCategoryState';
import useMoneyInvitations from '../../entity-invitations/hooks/useMoneyInvitations';
import { EntityUser } from '../../../user/types';
import { Fieldset } from 'primereact/fieldset';
export const AddEditMoneyTransaction = ({
  moneyTransaction,
  users,
  onSaveMoneyTransaction,
  onCancel,
}: {
  users: EntityUser[];
  category: ICategory | null;
  moneyTransaction: IMoneyTransaction;
  onSaveMoneyTransaction: (moneyTransaction: IMoneyTransaction) => void;
  onCancel: () => void;
}) => {
  const { invitations } = useBetween(useMoneyInvitations);
  const { getAccountsForAUser } = useMoneyAccounts();
  const { currentTranslation } = useBetween(useTranslations);
  const { selectedCategory } = useBetween(useCategoryState);
  const { accounts, getAccountById } = useBetween(useMoneyAccounts);

  const { enterPressed, clearEnterPressed } = useBetween(useEvents);
  const [error, setError] = useState('');
  const [currentTransaction, setCurrentTransaction] =
    useState<IMoneyTransaction>({ ...moneyTransaction });

  const updateCurrentTransaction = (key: string, value: any) => {
    setCurrentTransaction({
      ...currentTransaction,
      [key]: value,
    });
  };

  const [selectedAccount, setSelectedAccount] = useState<IMoneyAccount | null>(
    getAccountById(currentTransaction?.accountId) || null
  );

  const [userToTransfer, setUserToTransfer] = useState<EntityUser | null>(null);

  const [userAccountsForTransfer, setUserAccountsForTransfer] = useState<
    IMoneyAccount[] | null
  >(null);

  const [userToTransferAccount, setUserToTransferAccount] =
    useState<IMoneyAccount | null>(null);

  useEffect(() => {
    if (!userToTransfer) {
      return;
    }
    getAccountsForAUser(userToTransfer._id).then((val) => {
      setUserAccountsForTransfer(val);
    });
  }, [userToTransfer]);

  function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  }

  const triggerSaveMoneyTransaction = () => {
    debugger;
    setError('');
    console.log(currentTransaction.amount);

    if (
      !isNumber(currentTransaction.amount) ||
      !currentTransaction.amount ||
      currentTransaction.amount < 0
    ) {
      setError('invalid amount');
      return;
    }
    if (!selectedCategory) {
      setError('invalid category');
      return;
    }
    currentTransaction.category_id = selectedCategory._id;
    if (currentTransaction._id) {
      // currentTransaction.amount =
      //   currentTransaction.amount - moneyTransaction.amount;

      currentTransaction.difs = utils.compareObjects(
        moneyTransaction,
        currentTransaction
      );
    }
    if (currentTransaction.type !== IMoneyTransactionType.TRANSFER) {
      currentTransaction.touseraccountid = undefined;
      currentTransaction.touserid = undefined;
    }
    onSaveMoneyTransaction(currentTransaction);
  };

  useEffect(() => {
    if (!enterPressed) {
      return;
    }
    triggerSaveMoneyTransaction();
    clearEnterPressed();
  }, [enterPressed]);

  const moneyTransactionOptionTemplate = (option, onClick, checked) => {
    const css = checked ? 'rbspan selected' : 'rbspan';
    return (
      <span className={css} key={option.value} onClick={onClick}>
        <MyIcon
          icon={option.icon}
          tooltip={option.label}
          onClick={onClick}
        ></MyIcon>
        {/* {checked && <MyIcon icon="pi pi-check"></MyIcon>} */}
      </span>
    );
  };

  return (
    <>
      <div className="fcenterv">
        {/* {JSON.stringify(currentTransaction, null, 2)} */}
        {/* {JSON.stringify(moneyTransaction.amount)} */}
        <div className="scroll">
          <div className="flex " style={{ marginTop: '10px' }}>
            <LabelRadioButtonList
              renderOption={moneyTransactionOptionTemplate}
              label={currentTranslation.MONEY_TRANSACTIONS.transactionType}
              lwidth="135px"
              selectedValue={currentTransaction?.type}
              options={moneyTransactionOptionTypes}
              // itemTemplate={moneyTransactionOptionTemplate}
              onChange={(val) => {
                const newV: IMoneyTransaction = {
                  ...currentTransaction,
                  type: val as IMoneyTransactionType,
                };
                updateCurrentTransaction('type', val);
              }}
              name="type"
              labelField="label"
              valueField="value"
            ></LabelRadioButtonList>
          </div>

          {currentTransaction.type === IMoneyTransactionType.TRANSFER && (
            <div className="fcenter1 mt10">
              <Fieldset legend="Transfer Details">
                <div>
                  <LabelDropDown
                    label={currentTranslation.MONEY_TRANSACTIONS.users}
                    lwidth="135px"
                    onChange={(user: EntityUser) => {
                      setUserToTransfer(user);
                      currentTransaction.touserid = user._id;
                    }}
                    options={invitations || []}
                    value={userToTransfer}
                    optionLabel="name"
                    optionValue="_id"
                  ></LabelDropDown>
                </div>
                <div className="mt10">
                  <LabelDropDown
                    label={currentTranslation.ACCOUNT.account}
                    lwidth="135px"
                    onChange={(account: IMoneyAccount) => {
                      setUserToTransferAccount(account);
                      currentTransaction.touseraccountid = account._id;
                    }}
                    options={userAccountsForTransfer || []}
                    value={userToTransferAccount}
                    optionLabel="name"
                    optionValue="_id"
                  ></LabelDropDown>
                </div>
              </Fieldset>
            </div>
          )}

          {/* {JSON.stringify(currentTransaction)} */}
          <div className="flex mt10">
            <LabelNumericInput
              autoFocus
              label={currentTranslation.HEADERS.Amount}
              lwidth="135px"
              onChange={(val: number) => {
                setError('');
                const newV: IMoneyTransaction = {
                  ...currentTransaction,
                  amount: val,
                };
                // setCurrentTransaction(newV);
                updateCurrentTransaction('amount', val);
              }}
              value={currentTransaction?.amount}
              onEnter={() => triggerSaveMoneyTransaction()}
            ></LabelNumericInput>
          </div>
          <div className="flex mt10">
            <LabelDate
              label={currentTranslation.HEADERS.Date}
              lwidth="135px"
              onChange={(date: number) => {
                const newItem: IMoneyTransaction = {
                  ...currentTransaction,
                  tdate: date,
                };
                // setCurrentTransaction(newItem);
                updateCurrentTransaction('date', date);
              }}
              data={currentTransaction.tdate}
            ></LabelDate>
          </div>

          <div className="flex mt10">
            <LabelDropDown
              label={currentTranslation.ACCOUNT.account}
              lwidth="135px"
              onChange={(account: IMoneyAccount) => {
                const newItem: IMoneyTransaction = {
                  ...currentTransaction,
                  accountId: account._id || '',
                };
                // setCurrentTransaction(newItem);
                updateCurrentTransaction('accountId', account._id);
                setSelectedAccount(account);
              }}
              options={accounts || []}
              value={selectedAccount}
              optionLabel="name"
              optionValue="_id"
            ></LabelDropDown>
          </div>

          <div className="mt10">
            <WysYWYG
              html={currentTransaction.description}
              setHtml={(val: string) =>
                updateCurrentTransaction('description', val)
              }
            />
          </div>
        </div>

        <div className="error">{error}</div>
      </div>
      <div className="flex space-between mt10">
        <MyButton
          text={currentTranslation.CANCEL}
          onClick={() => onCancel()}
        ></MyButton>
        <MyButton
          text={
            currentTransaction._id
              ? currentTranslation.UPDATE
              : currentTranslation.SAVE
          }
          onClick={() => {
            console.log(currentTransaction);
            triggerSaveMoneyTransaction();
          }}
        ></MyButton>
      </div>
    </>
  );
};

export default AddEditMoneyTransaction;
