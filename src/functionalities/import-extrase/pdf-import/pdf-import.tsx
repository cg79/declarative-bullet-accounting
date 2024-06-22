import { useCallback, useEffect, useRef, useState } from "react";

import BulletFile from "declarative-fluent-bullet-api/BulletFile";
import {
  BULLET_METHOD,
  STORAGE_PROVIDER,
} from "declarative-fluent-bullet-api/fluent/constants";
import { FirmeAngajatiDropDown } from "../../employee/dropdown/firme-angajati-dropdown";

import { MyButton } from "../../../_components/reuse/my-button";

import useFirme from "../../../_store/useFirme";
import { useBetween } from "use-between";
import useDeclarativeBulletApi from "../../../hooks/useDeclarativeBulletApi";
import { TabView, TabPanel } from "primereact/tabview";
import { Transactions } from "./transactions";
import useImportTransactions from "./useImportTransactions";
import { BULLET_IO_URL } from "../../../constants";
import { utils } from "../../../_utils/utils";
import { helpers } from "../../../_utils/helpers";

export const PdfImport = () => {
  const { createDeclarativeBulletApi } = useDeclarativeBulletApi();
  const [filesForUpload, setFilesForUpload] = useState([]);

  const { pdfAngajatCollection, selectedAngajat } = useBetween(useFirme);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { parsePdfFile } = useBetween(useImportTransactions);

  const createIFiles = (files: any[]) => {
    const response: BulletFile[] = [];

    [...files].forEach((file) => {
      const bf = new BulletFile();
      bf.setFile(file);
      response.push(bf);
    });
    return response;
  };

  const [active, setActive] = useState(0);
  const activateTabIndex = (index: number) => {
    if (index !== active) {
      setActive(index);
    }
  };

  const selectFirstTab = () => {
    setTimeout(() => {
      activateTabIndex(0); // set
    }, 2000);
    return (
      <div className="flex center">
        <label className="bold">
          Selectati prima data firma si angajatul. Aplicatia va selecta automat
          ecranul corespunzator
        </label>
      </div>
    );
  };

  const loadSavedFiles = useCallback(async () => {
    const pdfCollection = pdfAngajatCollection;
    if (!pdfCollection) {
      return;
    }

    const api2 = createDeclarativeBulletApi();
    const response = await api2
      .collection((c) => c.name(pdfCollection).method(BULLET_METHOD.FIND))
      .execute();

    helpers.checkHttpResponseForErrors(response);
    if (response.success) {
      setUploadedFiles(response.data);
    }
  }, [createDeclarativeBulletApi, pdfAngajatCollection]);

  const handleUploadClick = async (fileToUpload) => {
    if (!fileToUpload.length) {
      return;
    }
    if (!selectedAngajat) {
      return;
    }
    const ifiles = createIFiles(fileToUpload);
    const api = createDeclarativeBulletApi();
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

    const pdfCollection = pdfAngajatCollection;
    if (!pdfCollection) {
      return;
    }

    const api2 = createDeclarativeBulletApi();
    const apiResponse = await api2
      .body(response.data.files.list)
      .collection((c) => c.name(pdfCollection).method(BULLET_METHOD.INSERT))
      .execute();

    helpers.checkHttpResponseForErrors(apiResponse);

    setFilesForUpload([]);
    loadSavedFiles();
  };

  const deleteSelectedUploadedFiles = async () => {
    const pdfCollection = pdfAngajatCollection;
    if (!pdfCollection) {
      return;
    }
    const list: string[] = [];
    uploadedFiles.forEach((file: any) => {
      console.log(file);
      if (file.checked) {
        // request.bucket = record.files.bucket;
        list.push(file.name);
      }
    });
    const api2 = createDeclarativeBulletApi();
    const response = await api2
      .collection((c) =>
        c.name(pdfCollection).method(BULLET_METHOD.DELETE_MANY)
      )
      // .body({ name: list })
      .search((s) => s.in({ name: list }))
      .execute();

    helpers.checkHttpResponseForErrors(response);
    loadSavedFiles();
  };

  const getUploadedFilesCheckedNumber = () => {
    return uploadedFiles.filter((file: any) => file.checked).length;
  };
  const selectDeselectAllUploadedFiles = async (selected) => {
    uploadedFiles.forEach((transaction: any) => {
      transaction.checked = selected ? true : false;
    });
    setUploadedFiles([...uploadedFiles]);
  };
  const renderUploadedFiles = (uploadedFiles) => {
    // return null;

    const selectedCount = getUploadedFilesCheckedNumber();
    return (
      <div>
        <div className="flex bold center mt5">
          Lista extraselor aflate pe server
        </div>
        <ol>
          {uploadedFiles.map((file: any, i) => (
            <li
              className="mt5"
              key={utils.createUUID()}
              onClick={() => {
                file.checked = !!!file.checked;
                setUploadedFiles([...uploadedFiles] as any);
              }}
            >
              <div className="flex checkbox-wrapper">
                <input
                  type="checkbox"
                  id="toggle"
                  className="checkbox"
                  checked={!!file.checked}
                  onChange={() => {}}
                />
                <label className="switch"></label>
                <div className="ml5">{file.name}</div>
                <div className="ml10">
                  <a
                    href={`${BULLET_IO_URL()}/uploads/${pdfAngajatCollection}/${
                      file.name
                    }`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Vizualizare
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {uploadedFiles.length ? (
          <div>
            <div className="flex center">
              <MyButton
                text="Vizualizare Tranzactii"
                onClick={() => {
                  parsePdfFile(uploadedFiles);
                  activateTabIndex(2);
                }}
                className=""
                disabled={selectedCount === 0}
              ></MyButton>
            </div>

            <MyButton
              onClick={() => selectDeselectAllUploadedFiles(true)}
              text={"Select All"}
            ></MyButton>

            <MyButton
              onClick={() => selectDeselectAllUploadedFiles(false)}
              text={"Deselectare"}
              disabled={selectedCount === 0}
            ></MyButton>
            <MyButton
              onClick={() => deleteSelectedUploadedFiles()}
              text={"Stergere"}
              disabled={selectedCount === 0}
            ></MyButton>
          </div>
        ) : null}
      </div>
    );
  };

  const renderFilesForUpload = () => (
    <ol>
      {[...filesForUpload].map((f: any, i) => (
        <li key={utils.createUUID()}>
          {f.name} - {f.type}
        </li>
      ))}
    </ol>
  );

  useEffect(() => {
    loadSavedFiles();
  }, [loadSavedFiles, selectedAngajat]);

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <div className="Appf">
        <TabView
          activeIndex={active}
          onTabChange={(e) => activateTabIndex(e.index)}
        >
          <TabPanel header="Alegeti Firma/Angajat">
            <div className="flex flex1 center">
              <FirmeAngajatiDropDown></FirmeAngajatiDropDown>
            </div>
            {selectedAngajat ? (
              <div className="fcenter bold">
                <MyButton
                  text="Alegeti fisierele care contin extrase, si salvati-le"
                  onClick={() => activateTabIndex(1)}
                  className="mt10 linkbutton"
                  useBaseButton={false}
                ></MyButton>
              </div>
            ) : null}
          </TabPanel>
          <TabPanel header="Parsare extrase">
            {!selectedAngajat ? (
              <div>{selectFirstTab()}</div>
            ) : (
              <>
                <div className="flex center">
                  <h3>
                    Alegeti fisierele care contin extrase, si salvati-le pe
                    server
                  </h3>
                </div>
                <div className="flex">
                  <div className="flex flex1 center">
                    <div className="upload">
                      <input
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={(e: any) => handleUploadClick(e.target.files)}
                        ref={inputRef}
                        className="dnone"
                      />
                      <div className="flex center">
                        <MyButton
                          text="Alegeti fisiere"
                          onClick={() => {
                            inputRef.current?.click();
                          }}
                        ></MyButton>
                      </div>

                      {renderFilesForUpload()}
                      {/* <div className="flex center">
                        <MyButton
                          text={
                            status === STATUS_IDLE
                              ? "Send to server"
                              : "Uploading..."
                          }
                          onClick={() => {}}
                          disabled={!filesForUpload.length}
                        ></MyButton>
                      </div> */}

                      {renderUploadedFiles(uploadedFiles)}
                    </div>
                  </div>
                </div>
              </>
            )}
          </TabPanel>
          <TabPanel header="Import extrase">
            <div className="cell-v-aligngg">
              <Transactions></Transactions>
            </div>
          </TabPanel>
        </TabView>

        {/* <div className="flex center">
          <h4>
            {selectedFirma?.nume} - {selectedAngajat?.nume}
          </h4>
        </div> */}
      </div>

      {/* {JSON.stringify(uploadedFiles, null, 2)} */}
    </div>
  );
};
