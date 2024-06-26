import { useBetween } from "use-between";
import useFirme from "../../_store/useFirme";
import { ICompany } from "../company/types";
import { utils } from "../../_utils/utils";
import useAccountingDbActions from "../transactions/hook/useAccountingDbActions";
import { IAngajat } from "../transactions/model/accounting_types";
import { useCallback, useEffect, useState } from "react";
import { MyButton } from "../../_components/reuse/my-button";
import { useNavigate } from "react-router-dom";
import { MyLottie } from "../../_components/reuse/my-lottie";
import useIdentity from "../../_store/useIdentity";
import { helpers } from "../../_utils/helpers";

const Start = () => {
  const { setSelectedFirma, reload, firme } = useBetween(useFirme);
  const { saveFirma, saveAngajat, importTaxe, importSalariiForAngajat } =
    useAccountingDbActions();
  const { loggedUser } = useBetween(useIdentity);

  const [message, setMessage] = useState("");
  const [importing, setImporting] = useState(true);
  const navigate = useNavigate();

  const importaFirma = useCallback(
    async (nume: string = "Firma Initiala"): Promise<ICompany> => {
      const defaultCompany: ICompany = {
        _id: "",
        nume,
        dataInfiintare: utils.dateToEpoch(),
        isActive: false,
        codFiscal: "",
      };
      const firmaResult = await saveFirma(defaultCompany);
      return firmaResult.data;
    },
    [saveFirma]
  );

  const importaAngajatPtFirma = useCallback(
    async (company: ICompany, angajat: IAngajat): Promise<IAngajat> => {
      const angajatResponse = await saveAngajat(angajat, company._id);
      helpers.checkHttpResponseForErrors(angajatResponse);
      return angajatResponse.data;
    },
    [saveAngajat]
  );

  const wait = async function (ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const startImport = async () => {
    setMessage("Se importa taxele");
    debugger;
    await wait(2000);

    await importTaxe();

    setMessage("Se importa firma default");
    await wait(1000);

    const defaultCompany = await importaFirma();

    setMessage("Se importa primul angajat al firmei");
    await wait(2000);
    const angajatResponse = await importaAngajatPtFirma(defaultCompany, {
      _id: "",
      nume: "Administrator",
      dataAngajare: utils.dateToEpoch(),
      salarii: [],
      showDemisie: false,
      contPersonal: "",
    });

    setMessage("Se importa salariile default pentru angajatul importat");
    await wait(2000);

    await importSalariiForAngajat(angajatResponse);

    setMessage("Se importa firma auxiliara");
    const auxiliarCompany = await importaFirma("Firma Auxiliara");
    await wait(2000);

    const auxiliarAngajat = await importaAngajatPtFirma(auxiliarCompany, {
      _id: "",
      nume: "Angajat Auxiliar",
      dataAngajare: utils.dateToEpoch(),
      salarii: [],
      showDemisie: false,
      contPersonal: "",
    });

    setMessage("Se importa salariile default pentru angajatul importat");
    await wait(2000);

    await importSalariiForAngajat(auxiliarAngajat);

    await reload();

    setSelectedFirma(defaultCompany);
    // setSelectedAngajat(angajatResponse);

    setMessage(
      "Importul s-a finalizat cu succes. Acum puteti adauga sau importa transactiile dorite."
    );

    setImporting(false);
  };

  // const checkShoyltriggerImport = () => {
  //   if (!loggedUser) {
  //     setMessage("Nu sunteti logat");
  //     wait(2000).then(() => {
  //       navigate("/login");
  //     });
  //     return;
  //   }
  //   getFirme({
  //     first: 0,
  //     pageNo: 0,
  //     rowsPerPage: 10,
  //   }).then((value) => {
  //     if (value.data.records.length > 0) {
  //       setImporting(false);
  //       setMessage("Datele initiale au fost deja importate");
  //       wait(2000).then(() => {
  //         setMessage("");
  //       });
  //       return;
  //     } else {
  //       startImport();
  //     }
  //   });
  // };

  useEffect(() => {
    if (!loggedUser) {
      setMessage("Nu sunteti logat");
      wait(2000).then(() => {
        navigate("/login");
      });
      return;
    }
    if (loggedUser.isInvited) {
      return navigate("/home");
    }

    if (!firme || !firme.length) {
      startImport();
    } else {
      setImporting(false);
      setMessage("Datele initiale au fost deja importate");
      wait(2000).then(() => {
        navigate("/accounting");
      });
      return;
    }
  }, [firme, loggedUser]);

  const navigareCatreTranzactii = () => {
    navigate("/accounting");
  };
  return (
    <>
      <div className="fcenter mt10">
        <div className="bold">Bun venit!</div>
      </div>

      {importing && (
        <div className="fcenter">
          <div
            className="mt10 fcenter bold"
            style={{ fontSize: "1.5em", width: "200px" }}
          >
            <MyLottie fileName="process" loop={true}></MyLottie>
          </div>
        </div>
      )}

      <div className="mt10 fcenter">
        <div className="mt10 bold">{message}</div>
      </div>

      {!importing && (
        <div className="mt10 fcenter">
          <MyButton
            text="Navigare catre tranzactii"
            // onClick={() => navigareCatreTranzactii()}
            onClick={() => startImport()}
            className="w300"
          ></MyButton>
        </div>
      )}
    </>
  );
};
export default Start;
