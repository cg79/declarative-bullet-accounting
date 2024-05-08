import { ParsedAccountingRecord } from "../../model/accounting_types";
import { TitleOldNew } from "./title-old-new";

const Situatie = ({ rec }: { rec: ParsedAccountingRecord }) => {
  return (
    <div className="ml5 place1 mt10">
      <label className="bold flex center">Situatie</label>
      <TitleOldNew title="Firma" old={0} neww={0}></TitleOldNew>
      <TitleOldNew title="Casa" old={rec.firma} neww={rec.firma1}></TitleOldNew>
      <TitleOldNew title="Taxe" old={rec.total} neww={rec.total1}></TitleOldNew>
      <TitleOldNew
        title="Disponibil"
        old={rec.disponibil}
        neww={rec.disponibil1}
      ></TitleOldNew>
    </div>
  );
};

export default Situatie;
