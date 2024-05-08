import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { MyTooltip } from "../../../_components/reuse/my-tooltip";
import { TabPanel, TabView } from "primereact/tabview";
import { Card } from "primereact/card";
import { parseAccountingRecord } from "../model/helpers";
import Situatie from "./components/situatie";
import Debts from "./components/debts";
import DebtsDetails from "./components/debts-details";
import TaxeAplicate from "./components/taxe-aplicate";
import Info from "./components/info";
import { EditTransaction } from "../add/edit-transaction";
// import { InsertTransaction } from "../add/insert-transaction";
import { SplitButton } from "primereact/splitbutton";
import useAccountingDbActions from "../hook/useAccountingDbActions";
import { useBetween } from "use-between";
import useFirme from "../../../_store/useFirme";
import { useTransactions } from "../hook/useTransactions";
import { IAccountingRecord } from "../model/accounting_types";
import { LabelTooltip } from "../../../_components/reuse/LabelTooltip";

export const TransactionRecord = ({
  accountingRecord,
}: // executeDeleteAccountingRecordNoAngajat,
// executeUpdateAccountingRecordNoAngajat,
// executeInsertAction,
// executeCancelAction,
// insertMode,
{
  accountingRecord: IAccountingRecord;
}) => {
  // const inputRef = useRef<HTMLInputElement>(null);
  const [editMode, setEditMode] = useState(0); //1 EDIT 2 INSERT
  const { deleteAccountingRecord } = useAccountingDbActions();

  const { selectedAngajat } = useBetween(useFirme);
  const { reloadAccountingRecords } = useBetween(useTransactions);
  // console.log("accountingRecord.editMode ", accountingRecord.editMode);
  // const [defaultOption, setDefaultOption] = useState(ddOptions[0]);

  // const getSvgIcon = (operationid: number) => {
  //   switch (operationid) {
  //     case 1: {
  //       return (
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           viewBox="0 0 64 64"
  //           width={33}
  //           height={32}
  //         >
  //           <path d="M51.125 46.131A25.923 25.923 0 0 0 40.87 25.479l-5.347-4.056a5.826 5.826 0 0 0-7.046 0l-5.347 4.056a25.923 25.923 0 0 0-10.255 20.652v.582C12.875 52.395 17.48 57 23.162 57h17.676c5.682 0 10.287-4.605 10.287-10.287v-.582z" />
  //           <path d="m27 22.543-2.287-10.324a3.228 3.228 0 0 1 2.52-3.866l.351-.07a3.231 3.231 0 0 1 2.571.583l1.657 1.243a3.233 3.233 0 0 0 2.638.569l1.468-.326a3.23 3.23 0 0 1 3.68 4.397L36.5 22.164M24 54s-5.099-.082-7-5M34 36.5a2.5 2.5 0 1 0-2 4 2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1-2-1M32 35.5v-2M32 47.5v-2" />
  //         </svg>
  //       );
  //     }
  //     default: {
  //       return (
  //         <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
  //           <path fill="none" d="M0 0h24v24H0z" />
  //           <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1.95-9H15v2h-4.95a2.5 2.5 0 004.064 1.41l1.7 1.133A4.5 4.5 0 018.028 13H7v-2h1.027a4.5 4.5 0 017.788-2.543L14.114 9.59A2.5 2.5 0 0010.05 11z" />
  //         </svg>
  //       );
  //     }
  //   }
  // };

  // const onDeleteAccountingRecord = () => {
  //   // executeDeleteAccountingRecordNoAngajat &&
  //   //   executeDeleteAccountingRecordNoAngajat(accountingRecord).then(() =>
  //   //     setEditMode(false)
  //   //   );
  // };

  const onCancel = () => {
    setEditMode(0);
    // if (executeCancelAction) {
    //   executeCancelAction(accountingRecord);
    // }
  };

  // const triggerUpdateAccountingRecord = (values: IAddEditTransactionValues) => {
  //   // onSave: (values: IAccountingAction) => Promise<void>;
  //   // if (!executeUpdateAccountingRecordNoAngajat) {
  //   //   return Promise.resolve();
  //   // }
  //   // return executeUpdateAccountingRecordNoAngajat(
  //   //   accountingRecord,
  //   //   values
  //   // ).then((v) => setEditMode(false));
  // };

  const rec = parseAccountingRecord(accountingRecord);

  const items = [
    // {
    //   label: "Insert",
    //   icon: "pi pi-refresh",
    //   command: () => {
    //     setEditMode(2);
    //   },
    // },
    {
      label: "Delete",
      icon: "pi pi-times",
      command: () => {
        console.log(this);
        deleteTransaction();
      },
    },
    {
      label: "Import",
      icon: "pi pi-times",
      command: () => {
        console.log(this);
      },
    },
  ];

  const deleteTransaction = () => {
    if (!selectedAngajat) {
      return;
    }

    deleteAccountingRecord(accountingRecord, selectedAngajat._id).then(() => {
      onCancel();
      reloadAccountingRecords();
    });
  };
  const renderRecordAvailableActions = () => {
    if (accountingRecord.simulation) {
      return (
        <div className="fcenter bold">
          <LabelTooltip
            label="Simulare"
            tooltip="Tranzactie simulata"
          ></LabelTooltip>
        </div>
      );
    }
    return (
      <div className="flex  fcenter mt10">
        <SplitButton
          label="Editare"
          className="mt10 mybutton"
          icon="pi pi-plus"
          onClick={() => setEditMode(1)}
          model={items}
        />
        {/* <div className="cell-v-align flex-right insertbtn">
          <MyButton
            onClick={() =>
              executeInsertAction && executeInsertAction(accountingRecord)
            }
            text="Insert"
          ></MyButton> */}
        {/* </div> */}
      </div>
    );
  };

  return (
    rec && (
      <>
        <div className="flex center">
          <div className="mt10 flex-column center-v">
            <div className="flex center-h1">
              {/* <div>{getSvgIcon(rec.operationid)}</div> */}
              {/* {JSON.stringify(rec)} */}
              <MyTooltip
                tooltip={rec.description}
                // content={getSvgIcon(rec.operationid)}
              ></MyTooltip>

              <Card title="">
                <TabView>
                  <TabPanel header="Situatie">
                    <Info rec={rec}></Info>
                    <Situatie rec={rec}></Situatie>
                    {renderRecordAvailableActions()}
                  </TabPanel>
                  <TabPanel header="De platit">
                    <Debts rec={rec}></Debts>
                  </TabPanel>
                  <TabPanel header="Detalii Plati">
                    <TabView>
                      <TabPanel header="Plati">
                        <DebtsDetails rec={rec}></DebtsDetails>
                      </TabPanel>
                      <TabPanel header="Taxe Aplicate">
                        <TaxeAplicate rec={rec}></TaxeAplicate>
                      </TabPanel>
                    </TabView>
                  </TabPanel>
                </TabView>
              </Card>
            </div>
          </div>
        </div>
        {editMode === 1 && (
          <Dialog
            header="Editare Tranzactie"
            visible={editMode === 1}
            style={{ width: "80vw" }}
            onHide={() => setEditMode(0)}
          >
            <div className="flex center">
              <EditTransaction
                accountingRecord={accountingRecord}
                onCancel={() => onCancel()}
              ></EditTransaction>
            </div>
          </Dialog>
        )}
        {/* {editMode === 2 && (
          <Dialog
            header="Header"
            visible={editMode === 2}
            style={{ width: "80vw" }}
            onHide={() => setEditMode(0)}
          >
            <div className="flex center">
              <InsertTransaction
                accountingRecord={accountingRecord}
                onCancel={() => onCancel()}
              ></InsertTransaction>
            </div>
          </Dialog>
        )} */}
      </>
    )
  );
};
