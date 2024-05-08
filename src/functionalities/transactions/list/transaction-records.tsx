import { useRef } from "react";
import { TransactionRecord } from "./transaction-record";
import { IAccountingRecord } from "../model/accounting_types";
// import { TransactionList } from "./TransactionList";

export const TransactionRecords = ({
  accountingRecords,
}: {
  accountingRecords: IAccountingRecord[];
}) => {
  const divRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //
  //   if (shouldRefresh) {
  //     reloadAccountingRecords();
  //     setShouldRefresh(false);
  //   }
  // }, []);

  return (
    <div className="mt10 fcenter">
      {/* <TransactionList></TransactionList> */}
      <div ref={divRef} className="grid-container1 flex fwrap fcenter">
        {accountingRecords.map((accountingRecord) => (
          <div
            className="grid-item mycard"
            // onClick={() => selectAccountingRecord(accountingRecord)}
            key={accountingRecord.guid}
          >
            <TransactionRecord
              accountingRecord={accountingRecord}
              // executeDeleteAccountingRecordNoAngajat={(
              //   accountingRecord: IAccountingRecord
              // ) => {
              //   return executeDeleteAccountingAction(
              //     accountingRecord,
              //     angajatId
              //   );
              // }}
              // executeUpdateAccountingRecordNoAngajat={(
              //   accountingRecord: IAccountingRecord,
              //   accountingRequest: IAddEditTransactionValues
              // ) => {
              //   return executeUpdateAccountingAction(
              //     accountingRecord,
              //     accountingRequest,
              //     angajatId
              //   );
              // }}
              // executeInsertAction={executeInsertAction}
              // insertMode={insertMode}
              // executeCancelAction={
              //   undefined
              //   // accountingRecord.isInsert
              //   //   ? executeRemoveRecordUsedForInsert
              //   //   : undefined
              // }
            ></TransactionRecord>
          </div>
        ))}
      </div>
    </div>
  );
};
