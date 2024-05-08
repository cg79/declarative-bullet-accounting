import { Dropdown } from "primereact/dropdown";
import useFirme from "../../../_store/useFirme";
// import useAccountingDbActions from "../_store/useAccountingDbActions";
import { useBetween } from "use-between";

export const FirmeDropDown = () => {
  // const { getFirme } = useAccountingDbActions();
  const { firme } = useBetween(useFirme);

  const { selectedFirma, setSelectedFirma } = useBetween(useFirme);
  // useEffect(() => {
  //   getFirme().then((val) => {
  //     const list = val.map((el) => {
  //       return {
  //         value: el._id,
  //         label: el.nume,
  //       };
  //     });

  //     setAngajati(list);
  //   });
  // }, []);

  return (
    <div className="mt10  ">
      <div className="bold">Firme</div>
      <Dropdown
        options={firme}
        optionLabel="nume"
        onChange={(val: any) => {
          setSelectedFirma(val.value);
          // setSelected(val);
          // onSelect(val);
        }}
        value={selectedFirma}
        placeholder="Selecteaza firma"
      />
      {/* <div>{selected.value}</div> */}
    </div>
  );
};
