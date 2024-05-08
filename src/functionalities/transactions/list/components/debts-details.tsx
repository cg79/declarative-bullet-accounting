import { ParsedAccountingRecord } from "../../model/accounting_types";
import { TitleOldNew } from "./title-old-new";

const DebtsDetails = ({ rec }: { rec: ParsedAccountingRecord }) => {
  return (
    <div className="ml5 place1">
      {/* <label className="bold flex center">Detalii plati</label> */}
      <TitleOldNew
        title="Sanatate"
        old={rec.sanatate}
        neww={rec.sanatate1}
      ></TitleOldNew>
      <TitleOldNew
        title="Pensie"
        old={rec.pensie}
        neww={rec.pensie1}
      ></TitleOldNew>
      <TitleOldNew
        title="Dividende"
        old={rec.dividende}
        neww={rec.dividende1}
      ></TitleOldNew>
      <TitleOldNew
        title="Taxa Profit"
        old={rec.taxa_profit}
        neww={rec.taxa_profit1}
      ></TitleOldNew>
      <TitleOldNew
        title="TVA Deductibil"
        old={rec.tva_deductibil}
        neww={rec.tva_deductibil1}
      ></TitleOldNew>
    </div>
  );
};

export default DebtsDetails;
