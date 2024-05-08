import { utils } from "../../../../_utils/utils";
import { ParsedAccountingRecord } from "../../model/accounting_types";

const TaxeAplicate = ({ rec }: { rec: ParsedAccountingRecord }) => {
  const lblv = (title: string, val: number) => {
    return (
      <div className="flex mt5">
        <div className=" lbl bold">{title}:</div>
        <div className="">{utils.toFixed(val)}</div>
      </div>
    );
  };

  return (
    <div className="ml5 place1">
      {/* <label className="bold flex center">Taxe aplicate</label> */}
      {rec.taxe_aplicate1.PENSIE > 0 &&
        lblv("Pensie", rec.taxe_aplicate1.PENSIE)}
      {rec.taxe_aplicate1.SANATATE > 0 &&
        lblv("Sanatate", rec.taxe_aplicate1.SANATATE)}
      {rec.taxe_aplicate1.ASIGURARE_MUNCA > 0 &&
        lblv("Asigurare", rec.taxe_aplicate1.ASIGURARE_MUNCA)}
      {rec.taxe_aplicate1.TVA && lblv("TVA", rec.taxe_aplicate1.TVA)}
      {rec.taxe_aplicate1.TAXEPROFIT > 0 &&
        lblv("Taxe Profit", rec.taxe_aplicate1.TAXEPROFIT)}
      {rec.taxe_aplicate1.DIVIDENDE > 0 &&
        lblv("Dividende", rec.taxe_aplicate1.DIVIDENDE)}
      {rec.taxe_aplicate1.SALARY > 0 &&
        lblv("Salar", rec.taxe_aplicate1.SALARY)}
      {rec.taxe_aplicate1.SCUTIRE_IMPOZIT > 0 &&
        lblv("Scutire Impozit", rec.taxe_aplicate1.SCUTIRE_IMPOZIT)}
    </div>
  );
};
export default TaxeAplicate;
