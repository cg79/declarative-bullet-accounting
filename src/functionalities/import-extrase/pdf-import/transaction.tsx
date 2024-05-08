import { Card } from "primereact/card";
import { utils } from "../../../_utils/utils";
import { Dropdown } from "primereact/dropdown";
import { ddOptions } from "../../transactions/constants/dd-options";
import { useBetween } from "use-between";
import useImportTransactions from "./useImportTransactions";
import { MyButton } from "../../../_components/reuse/my-button";
import { TransactionRecord } from "../../transactions/list/transaction-record";
import { SplitButton } from "primereact/splitbutton";
import useSimulation from "./useSimulation";
import { IAddEditTransactionValues } from "../../transactions/model/accounting_types";
import DatePickerWrapper from "../../../_components/reuse/DatePickerWrapper";
import useAccountingDbActions from "../../transactions/hook/useAccountingDbActions";
import useFirme from "../../../_store/useFirme";
import { LabelDate } from "../../../_components/reuse/LabelDate";

export const Transaction = ({
  trans,
  selectFacturaForTransaction,
  // setSelectedTransaction,
  // selectedTransaction,
  // inputRef,
}) => {
  // const [selectedTransaction, setSelectedTransaction] = useState(null);
  const {
    toggleSelection,
    setOperationId,
    setTransactionFacturaDate,
    setTransactionAccountingRecord,
    // importTransaction,
  } = useBetween(useImportTransactions);

  const { selectedAngajat } = useBetween(useFirme);

  const { addAccountingRecord } = useAccountingDbActions();

  const { simulateImportTransaction, resetCasa } = useBetween(useSimulation);

  const renderTransactionOptions = (trans: IAddEditTransactionValues) => {
    return (
      <div className="flexjhgj">
        <div>{utils.dateNumberToYYYYMMDD(trans.dataInregistrare)}</div>
        <Dropdown
          options={ddOptions}
          optionLabel="label"
          onChange={(val) => {
            setOperationId(trans, val.value);
          }}
          value={trans.operationid}
          placeholder="Select an option"
        />
        {(trans.operationid === 2 || trans.operationid === 1) && ( //intrare Salar
          <>
            {/* <div className="ml5 mt5 flex">
              <label>Data facturare</label>
              <div className="ml5">
                <DatePickerWrapper
                  data={trans.dataTranzactie}
                  onChange={(date: any) => {
                    setTransactionFacturaDate(trans, date);
                  }}
                />
              </div>
            </div> */}

            <div className="ml5 mt5 flex">
              <LabelDate
                label="Data facturare"
                data={trans.dataTranzactie}
                onChange={(date: any) => {
                  setTransactionFacturaDate(trans, date);
                }}
              ></LabelDate>
            </div>
            <div className="flex center mt10">
              <MyButton
                text="Incarcare Factura"
                onClick={() => {
                  selectFacturaForTransaction(trans);
                  // inputRef.current?.click();
                }}
              ></MyButton>
            </div>
            {trans.factura && (
              <div className="flex center">
                {/* {JSON.stringify(trans.factura)} */}
                <a
                  href={trans.factura.filePath}
                  target="_blank"
                  rel="noreferrer"
                >
                  {trans.factura.fileName}
                </a>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const renderDescription = (trans) => {
    return (
      <p className="m-0">
        <p
          style={{
            fontSize: "0.8em",
            width: "300px",
          }}
        >
          {trans.description.replace(/;/g, " ")}
        </p>
      </p>
    );
  };

  const items = (trans) => [
    {
      label: "Simulare Import",
      icon: "pi pi-times",
      command: async () => {
        console.log(this);
        if (!trans) {
          return;
        }
        const response = await simulateImportTransaction(trans);

        setTransactionAccountingRecord(trans, response);
      },
    },
    {
      label: "Resetare valori casa",
      icon: "pi pi-times",
      command: async () => {
        console.log(this);
        resetCasa();
      },
    },
  ];
  const renderTitle = (trans) => {
    return (
      <div className="flex space-between">
        <div
          className="flex checkbox-wrapper"
          onClick={() => toggleSelection(trans)}
        >
          <div className="wswitch">
            <input
              type="checkbox"
              id="toggle"
              className="checkbox"
              checked={!!trans.checked}
              onChange={() => {}}
            />

            <label className="switch"></label>
          </div>

          <span className="ml5">{trans.name}</span>
          <div>{trans.suma}</div>
        </div>
        <div>
          <SplitButton
            label="Import"
            className="mt10 mybutton"
            icon="pi pi-plus"
            onClick={async () => {
              if (!selectedAngajat) {
                return;
              }
              const response = await addAccountingRecord(
                trans,
                selectedAngajat?._id
              );

              setTransactionAccountingRecord(trans, response.data);
            }}
            model={items(trans)}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className=" transactionCard"
      key={utils.createUUID()}
      // onClick={() => setSelectedTransaction(trans)}
    >
      <>
        {!trans.accountingRecord && (
          <Card title={renderTitle(trans)}>
            <div className="bold">{trans.date}</div>

            {renderTransactionOptions(trans)}
            {renderDescription(trans)}
          </Card>
        )}

        {trans.accountingRecord && (
          <>
            <TransactionRecord
              accountingRecord={trans.accountingRecord}
            ></TransactionRecord>
          </>
        )}
      </>
    </div>
  );
};
