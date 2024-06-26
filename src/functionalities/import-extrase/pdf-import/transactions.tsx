import { useBetween } from "use-between";
import useImportTransactions from "./useImportTransactions";

import { utils } from "../../../_utils/utils";
import { MyButton } from "../../../_components/reuse/my-button";
import { useRef } from "react";
import BulletFile from "declarative-fluent-bullet-api/BulletFile";
import useFirme from "../../../_store/useFirme";
import { STORAGE_PROVIDER } from "declarative-fluent-bullet-api/fluent/constants";

import { BULLET_IO_URL } from "../../../constants";
import { Transaction } from "./transaction";
import { store } from "../../../_store/store";
import { helpers } from "../../../_utils/helpers";
import useApi from "../../transactions/hook/useApi";

export const Transactions = () => {
  const {
    importedTransactions,
    importTransactions,
    // selectDeselectAllTransactions,
    getSelectedTransactionsCount,
    setFacturaForTransaction,
  } = useBetween(useImportTransactions);
  const { executeMethod } = useApi();

  const { selectedAngajat } = useBetween(useFirme);

  const createIFiles = (files: any[]) => {
    const response: BulletFile[] = [];

    [...files].forEach((file) => {
      const bf = new BulletFile();
      bf.setFile(file);
      response.push(bf);
    });
    return response;
  };

  const handleUploadClick = async (filesForUpload: any[]) => {
    if (!selectedAngajat) {
      return;
    }
    const ifiles = createIFiles(filesForUpload);
    const api = executeMethod();
    const response = await api
      .storage((s) =>
        s
          .addFiles(ifiles)
          .bucket(selectedAngajat?._id || "")
          .provider(STORAGE_PROVIDER.LOCAL)
      )
      // .flow((f) => f.name("pdf_import"))
      // .collection((c) =>
      //   c
      //     .name(`pdffiles${store.getAngajat().value}`)
      //     .method(BULLET_METHOD.INSERT)
      // )
      .execute();

    helpers.checkHttpResponseForErrors(response);

    if (!response.success) {
      return;
    }

    const files = response.data.files;
    const filePath = `${files.bucket}/${files.list[0].name}`;
    return {
      filePath: `${BULLET_IO_URL()}/uploads/${filePath}`,
      fileName: files.list[0].name,
    };

    // const pdfCollection = pdfAngajatCollection;
    // if (!pdfCollection) {
    //   return;
    // }

    // const api2 = executeMethod();
    // await api2
    //   .body(response.data.files.list)
    //   .collection((c) => c.name(pdfCollection).method(BULLET_METHOD.INSERT))
    //   .execute();
    // setFilesForUpload([]);
    // loadSavedFiles();
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const selectFacturaForTransaction = (transaction: any) => {
    store.set("TRANZACTION", transaction);
    inputRef.current?.click();
  };
  const renderTransactions = () => {
    const selectedCount = getSelectedTransactionsCount();
    return !importedTransactions.length ? null : (
      <div
        className="cell-v-align mt10"
        key={utils.createUUID()}
        style={
          {
            // overflowX: "scroll",
            // maxWidth: store.screenSize().width - 20,
          }
        }
      >
        <div className="bold flex center">Lista tranzactiilor</div>
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={(e: any) => {
            // setFilesForUpload(e.target.files);
            handleUploadClick(e.target.files).then((val) => {
              console.log(val);
              const tranzaction = store.get("TRANZACTION");
              setFacturaForTransaction(tranzaction, val);
            });
          }}
          ref={inputRef}
          className="dnone"
        />
        <div className=" mt10">
          <ol>
            {importedTransactions.map((transaction: any) => {
              return (
                <div className="" key={utils.createUUID()}>
                  <div className="bold fcenter">{transaction.file}</div>
                  <div className="flex center mt10">
                    <div className="grid-container1 flex fwrap fcenter">
                      {transaction.dates.map((trans: any) => {
                        // if (!trans.date) {
                        //   trans.date = getDateFromString(
                        //     trans.datestr,
                        //     "dd/mm/yyyy"
                        //   );
                        // }
                        // trans.date = getDateFromString(
                        //   trans.datestr,
                        //   "dd/mm/yyyy"
                        // );

                        return (
                          <Transaction
                            key={utils.createUUID()}
                            trans={trans}
                            selectFacturaForTransaction={
                              selectFacturaForTransaction
                            }
                            // setSelectedTransaction={setSelectedTransaction}
                            // inputRef={inputRef}
                            // selectedTransaction={selectedTransaction}
                          ></Transaction>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </ol>
        </div>
        {importedTransactions.length ? (
          <div className="bottompage">
            <MyButton
              onClick={importTransactions}
              text={"Import Transactions"}
              disabled={selectedCount === 0}
            ></MyButton>

            {/* <MyButton
              onClick={() => selectDeselectAllTransactions(true)}
              text={"Select All"}
            ></MyButton> */}

            {/* <MyButton
              onClick={() => selectDeselectAllTransactions(false)}
              text={"Deselectare"}
            ></MyButton> */}
          </div>
        ) : null}
      </div>
    );
  };

  return renderTransactions();
};
