import { ISalarAngajat } from "../../../transactions/model/accounting_types";
import { MyButton } from "../../../../_components/reuse/my-button";

export const SalarView = ({
  salar,
  onDelete,
  onEdit,
  key,
}: {
  salar: ISalarAngajat;
  onDelete: (item: ISalarAngajat) => void;
  onEdit: () => void;
  key: string;
}) => {
  return (
    <div className="flex flexcolumn" key={key}>
      <div className="flex mt10">
        <div className="actionname">
          <label className="fixw">Salar:</label>
        </div>
        <div>
          <label className="fixw">{salar.value}</label>
          {salar.guid}
        </div>
      </div>

      <div className="flex mt10">
        <div className="actionname">
          <label className="fixw">Pensie:</label>
        </div>
        <div>
          <label className="fixw">{salar.taxe.pensie}</label>
        </div>
      </div>
      <div className="flex mt10">
        <div className="actionname">
          <label className="fixw">Sanatate:</label>
        </div>
        <div>
          <label className="fixw">{salar.taxe.sanatate}</label>
        </div>
      </div>
      <div className="flex mt10">
        <div className="actionname">
          <label className="fixw">Munca:</label>
        </div>
        <div>
          <label className="fixw">{salar.taxe.munca}</label>
        </div>
      </div>

      <div className="ml10">
        <MyButton text="Editare" onClick={() => onEdit()}></MyButton>
        <MyButton text="Stergere" onClick={() => onDelete(salar)}></MyButton>
      </div>

      {/* <div className="ml10">
        <MyButton
          text="Sterge"
          onClick={() => onDelete(item)}
        ></MyButton>
      </div> */}
      {/* <div className="ml10">
        <MyButton text="Salar nou" onClick={() => {onNew()}}></MyButton>
      </div> */}
    </div>
  );
};
