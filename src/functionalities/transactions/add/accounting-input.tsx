import { useState } from "react";
import { ddOptions } from "../constants/dd-options";
import { MyButton } from "../../../_components/reuse/my-button";

import { Dropdown } from "primereact/dropdown";
import { DeleteButton } from "../../../_components/reuse/delete-button";
import { IAddEditTransactionValues } from "../model/accounting_types";
import { NumericInput } from "../../../_components/reuse/numeric-input";
import { CustomHttpResponse } from "declarative-fluent-bullet-api/CustomHttpResponse";
// import DatePickerWrapper from "../../../_components/reuse/DatePickerWrapper";
import { LabelDate } from "../../../_components/reuse/LabelDate";
import { LabelDropDown } from "../../../_components/reuse/LabelDropDown";
import { LabelInput } from "../../../_components/reuse/LabelInput";
import { LabelNumericInput } from "../../../_components/reuse/LabelNumericInput";

export type AccountingActionType = () => unknown;

export interface IAccountAction extends IAddEditTransactionValues {
  onSave: (
    values: IAddEditTransactionValues
  ) => Promise<void | CustomHttpResponse>;
  onCancel: () => void;
  onDeleteAccountingRecord?: () => void;
}

export type AddEditTransaction = (a: IAccountAction) => void;

export const AccountingInput = ({
  addEditTransactionValues,
  onSave,
  onCancel,
  onDeleteAccountingRecord,
}: {
  addEditTransactionValues: IAddEditTransactionValues;
  onSave: (
    values: IAddEditTransactionValues
  ) => Promise<void | CustomHttpResponse>;
  onCancel: () => void;
  onDeleteAccountingRecord?: () => void;
}) => {
  const [descriptionV, setDescription] = useState(
    addEditTransactionValues.description
  );
  const [error, setError] = useState("");
  const [defaultOption, setDefaultOption] = useState(
    addEditTransactionValues.operationid
  );
  const _onSelect = (dval: any) => {
    setDefaultOption(dval.value);
  };
  const [dataInregistrare, setDataInregistrare] = useState(
    addEditTransactionValues.dataInregistrare
  );
  const [dataTranzactie, setDatatranzactie] = useState(
    addEditTransactionValues.dataTranzactie
  );
  const [accountingValue, setAccountingValue] = useState<number>(
    addEditTransactionValues.suma
  );

  const saveAccountingValues = () => {
    setError("");
    if (!accountingValue) {
      setError("Setati o valoare corecta");
      return;
    }

    const operationid = Number(defaultOption);
    if (!operationid) {
      setError("Setati actiunea");
      return;
    }

    if (!dataInregistrare) {
      setError("Setati data tranzactiei");
      return;
    }

    onSave({
      _id: addEditTransactionValues._id,
      guid: addEditTransactionValues.guid,
      suma: accountingValue,
      dataInregistrare: dataInregistrare,
      operationid,
      dataTranzactie,
      description: descriptionV,
    });
  };

  // useEffect(() => {
  //   setDefaultOption(
  //     ddOptions.find(
  //       (el) => el.value === addEditTransactionValues.operationid
  //     ) || ddOptions[0]
  //   );
  // }, [addEditTransactionValues.value]);

  // const setKeyNumericValue = (event: any, key: string) => {
  // accountingInput[key] = parseInt(event.target.value) || 0;
  // setAccountingInput({ ...accountingInput });
  // };

  return (
    <div className="mt10 card1 flexcolumn">
      {onDeleteAccountingRecord && (
        <DeleteButton
          onClick={() => onDeleteAccountingRecord()}
          text="X"
          css="delete_button"
        ></DeleteButton>
      )}

      {/* <div className="flex mt10">
          <div className="actionname flexcolumn">
            <span className="bold">Valoare:</span>
          </div>
          <div>
            <NumericInput
              value={accountingValue}
              onUpdate={(v) => setAccountingValue(v)}
            ></NumericInput>
          </div>
        </div> */}

      <div className="mt10">
        <LabelNumericInput
          label="Valoare:"
          onChange={(v) => setAccountingValue(v)}
          value={accountingValue}
        ></LabelNumericInput>
      </div>

      {error ? (
        <div className="flex error">
          <div className="actionname">
            <span className="bold"></span>
          </div>
          <div>{error}</div>
        </div>
      ) : null}

      {/* <div className="flex mt10">
          <div className="actionname">
            <span className="bold">Actiune:</span>
          </div>
          <div>
            <Dropdown
              options={ddOptions}
              onChange={_onSelect}
              value={defaultOption}
              placeholder="Select an option"
            />
          </div>
        </div> */}

      <div className="mt10">
        <LabelDropDown
          label="Actiune:"
          options={ddOptions}
          onChange={_onSelect}
          value={defaultOption}
          placeholder="Select an option"
        ></LabelDropDown>
      </div>

      <div className="mt10">
        <LabelDate
          label="Data Inregistrare:"
          data={dataInregistrare}
          onChange={(data: number) => setDataInregistrare(data)}
        ></LabelDate>
      </div>

      <div className="mt10">
        <LabelDate
          label="Data Tranzactie:"
          data={dataTranzactie}
          onChange={(data: number) => setDatatranzactie(data)}
        ></LabelDate>
      </div>

      <div className="flex flex1  flex-column mt10">
        <div className="actionname">
          <span className="bold">Descriere:</span>
        </div>

        <textarea
          style={{ width: "100%", border: "1px solid black" }}
          placeholder="&nbsp;"
          onChange={(event) => setDescription(event.target.value)}
          value={descriptionV}
        />
      </div>

      <hr />
      <div className="flex mt10 space-between">
        <div className="actionname">
          <MyButton onClick={() => onCancel()} text="Renunta"></MyButton>
        </div>
        <div>
          <MyButton
            onClick={() => saveAccountingValues()}
            text="Salveaza"
          ></MyButton>
        </div>
      </div>

      {/* https://www.w3schools.com/charsets/ref_utf_arrows.asp */}
    </div>
  );
};
