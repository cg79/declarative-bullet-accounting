import { utils } from "../../../../_utils/utils";
import { Actions } from "../../constants/dd-options";
import { ParsedAccountingRecord } from "../../model/accounting_types";

const Info = ({ rec }: { rec: ParsedAccountingRecord }) => {
  const ordine = (title: string, old: number, neww: number) => {
    return (
      <div className="flex space-between mt5">
        <div className="bold" style={{ fontSize: "0.8em" }}>
          {title}:
        </div>
        <div className="">{old}</div>
        &#8594;
        <div className="">{neww}</div>
      </div>
    );
  };

  const lblv = (title: string, val: number) => {
    return (
      <div className="flex space-between mt5">
        <div className=" lbl bold" style={{ fontSize: "0.8em" }}>
          {title}:
        </div>
        <div className="">{utils.toFixed(val)}</div>
      </div>
    );
  };

  const lbls = (title: string, val: string) => {
    return (
      <div className="flex space-between mt5">
        <div className=" lbl bold" style={{ fontSize: "0.8em" }}>
          {title}:
        </div>
        <div className="">{val}</div>
      </div>
    );
  };

  return (
    <div className="placec">
      {lblv("Suma", rec.suma)}

      {
        lbls(
          "Data Inregistrare",
          utils.dateNumberToYYYYMMDD(rec.dataInregistrare)
        )
        // `${rec.data.luna}-${rec.data.zi}-${rec.data.an}`
      }
      {rec.dataTranzactie &&
        lbls(
          "Data Factura",
          utils.dateNumberToYYYYMMDD(rec.dataTranzactie)
          // `${rec.dataTranzactie.luna}-${rec.dataTranzactie.zi}-${rec.dataTranzactie.an}`
        )}
      {lbls("Actiune", Actions[rec.operationid])}
      {ordine("Numar Ordine", rec.numar, rec.numar1)}

      {rec.factura && (
        <div className="flex center">
          <a href={rec.factura.filePath} target="_blank" rel="noreferrer">
            {rec.factura.fileName}
          </a>
        </div>
      )}
      <hr />
    </div>
  );
};

export default Info;
