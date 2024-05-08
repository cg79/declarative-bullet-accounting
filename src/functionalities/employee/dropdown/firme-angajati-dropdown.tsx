import { Dropdown } from "primereact/dropdown";
import { AngajatiDropDown } from "./angajati-dropdown";
import useFirme from "../../../_store/useFirme";
import { useBetween } from "use-between";

export const FirmeAngajatiDropDown = () => {
  // const [listaAngajati, setAngajati] = useState<IAngajat[]>([]);
  const { firme, selectedFirma, setSelectedFirma, clearAngajat } =
    useBetween(useFirme);

  // useEffect(() => {
  //   if (firme) {
  //     return;
  //   }
  //   getFirme().then((val) => {
  //     const list = val.map((el) => {
  //       return {
  //         value: el._id,
  //         label: el.nume,
  //       };
  //     });

  //     setFirme(list);
  //   });
  // }, [firme, setFirme]);

  return (
    <div className="mt10  relative ">
      {/* {JSON.stringify(firme)} */}
      <div className="flex center mt10">
        <h3>Alegeti firma si angajatul din listele de mai jos</h3>
      </div>
      <div className="flex">
        <div className="wlabel1">Firme:</div>
        <div>
          <Dropdown
            // options={firme.map((el) => ({ label: el.nume, value: el._id }))}
            options={firme}
            optionLabel="nume"
            onChange={(val: any) => {
              if (val.value._id === selectedFirma?._id) {
                return;
              }
              setSelectedFirma(val.value);
              // setAngajati(getAngajatiForFirma(selectedFirma.value));
              clearAngajat();
            }}
            // value={{ label: selectedFirma?.nume, value: selectedFirma?._id || "" }}
            value={selectedFirma}
            placeholder="Selecteaza firma"
          />
        </div>
      </div>

      <div className="mt10 flex">
        <div className="wlabel1">Angajati:</div>
        <div>
          <AngajatiDropDown></AngajatiDropDown>
        </div>
      </div>
    </div>
  );
};
