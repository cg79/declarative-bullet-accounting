import { ParsedAccountingRecord } from "../../model/accounting_types";
import { TitleOldNew } from "./title-old-new";

const Debts = ({ rec }: { rec: ParsedAccountingRecord }) => {
  return (
    <div className="ml5 place1 mt10">
      {/* <label className="bold flex center">De platit</label> */}
      <TitleOldNew
        title="Trezorerie"
        old={rec.taxeTrezorerie}
        neww={rec.taxeTrezorerie1}
      ></TitleOldNew>
      <TitleOldNew
        title="Munca"
        old={rec.munca}
        neww={rec.munca1}
      ></TitleOldNew>
      <TitleOldNew title="TVA" old={rec.tva} neww={rec.tva1}></TitleOldNew>
      <TitleOldNew
        title="Salar"
        old={rec.salar_value}
        neww={rec.salar_value1}
      ></TitleOldNew>
    </div>
  );
};

export default Debts;
