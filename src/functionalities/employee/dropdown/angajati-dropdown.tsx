import { Dropdown } from "primereact/dropdown";
import useFirme from "../../../_store/useFirme";
import { useBetween } from "use-between";

export const AngajatiDropDown = () => {
  const { selectedAngajat, setSelectedAngajat, angajati } =
    useBetween(useFirme);

  return (
    <div className="mt10 ">
      <Dropdown
        options={angajati}
        optionLabel="nume"
        onChange={(val: any) => {
          // if (selectedAngajat?._id === val.value._id) {
          //   return;
          // }
          setSelectedAngajat(val.value);
          // setSelected(val);
          // onSelect(val);
        }}
        value={selectedAngajat}
        placeholder="Selecteaza angajat"
      />
    </div>
  );
};
