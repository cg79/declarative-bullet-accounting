import { useEffect, useState } from "react";
import { STARTING_ACCOUNT_VALUES } from "../transactions/constants/accounting_constants";
import { AccountingField } from "../transactions/add/accounting-field";
import { MyButton } from "../../_components/reuse/my-button";
import { FirmeDropDown } from "../company/dropdown/firme-dropdown";
import { utils } from "../../_utils/utils";
import useFirme from "../../_store/useFirme";
import useAccountingDbActions from "../transactions/hook/useAccountingDbActions";
import { useBetween } from "use-between";

// STARTING_ACCOUNT_VALUES;
export const AccountingInitialValues = () => {
  const { getInitialAccountingValues, setInitialAccountingValues } =
    useAccountingDbActions();
  const [initialState, setInitialState] = useState({
    ...STARTING_ACCOUNT_VALUES,
  });
  const { selectedFirma } = useBetween(useFirme);
  const [editMode, setEditMode] = useState(false);

  const arr = [
    {
      label: "TAXE",
      items: [
        {
          label: "Pensie",
          onChange: (val: string) => (initialState.taxe.pensie = Number(val)),
          value: () => initialState.taxe.pensie,
        },
        {
          label: "Sanatate",
          onChange: (val: string) => (initialState.taxe.sanatate = Number(val)),
          value: () => initialState.taxe.sanatate,
        },
        {
          label: "Munca",
          onChange: (val: string) => (initialState.taxe.munca = Number(val)),
          value: () => initialState.taxe.munca,
        },
        {
          label: "Dividende",
          onChange: (val: string) =>
            (initialState.taxe.dividende = Number(val)),
          value: () => initialState.taxe.dividende,
        },
        {
          label: "Tva",
          onChange: (val: string) => (initialState.taxe.tva = Number(val)),
          value: () => initialState.taxe.tva,
        },
        {
          label: "Taxe Profit",
          onChange: (val: string) =>
            (initialState.taxe.taxa_profit = Number(val)),
          value: () => initialState.taxe.taxa_profit,
        },
        {
          label: "Tva deductibil",
          onChange: (val: string) =>
            (initialState.taxe.tva_deductibil = Number(val)),
          value: () => initialState.taxe.tva_deductibil,
        },
      ],
    },
    {
      label: "Casa",
      items: [
        {
          label: "Firma",
          onChange: (val: string) => {
            initialState.casa.firma = Number(val);
          },
          value: () => {
            return initialState.casa.firma;
          },
        },
        {
          label: "Cont Personal",
          onChange: (val: string) =>
            (initialState.casa.cont_personal = Number(val)),
          value: () => initialState.casa.cont_personal,
        },
        {
          label: "Disponibil",
          onChange: (val: string) =>
            (initialState.casa.disponibil = Number(val)),
          value: () => initialState.casa.disponibil,
        },
      ],
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const xxx = await getInitialAccountingValues(selectedFirma);
      debugger;
      setInitialState({ ...xxx });
    }
    fetchData();
  }, [getInitialAccountingValues, selectedFirma]);

  const saveInitialValues = () => {
    initialState.numar = -1;
    setInitialAccountingValues(selectedFirma, initialState);
    setEditMode(false);
  };
  const render = () => {
    let temp: JSX.Element[] = [];
    arr.map((el, index) =>
      temp.push(
        <div key={utils.createUUID()} className="flex">
          <ul className="myul">
            <li>
              <h2 className="flex center bold">{el.label}</h2>
            </li>
            <ul className="myul">
              {el.items.map((element, index1) => {
                return (
                  <li key={utils.createUUID()}>
                    <AccountingField
                      key={`${index}-${index1}-${utils.createUUID()}`}
                      label={element.label}
                      onChange={element.onChange}
                      value={element.value()}
                      readonly={!editMode}
                    ></AccountingField>
                  </li>
                );
              })}
            </ul>
          </ul>
        </div>
      )
    );
    return (
      <>
        <div className="flex cell-h-align  ">
          <FirmeDropDown></FirmeDropDown>
        </div>
        <div className="flex center-h fwrap">{temp}</div>
        <div className="flex center-h">
          {editMode && (
            <div className="flex">
              <MyButton
                text="Renunta"
                onClick={() => setEditMode(false)}
                disabled={selectedFirma?._id === ""}
              ></MyButton>
              <MyButton
                text="Salveaza"
                onClick={() => saveInitialValues()}
                disabled={selectedFirma?._id === ""}
              ></MyButton>
            </div>
          )}
          {!editMode && (
            <MyButton
              text="Editeaza"
              onClick={() => setEditMode(true)}
              disabled={selectedFirma?._id === ""}
            ></MyButton>
          )}
        </div>
      </>
    );
  };

  return render();
};
