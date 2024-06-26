import React, { useCallback, useEffect, useState } from "react";
import { IAngajat } from "../functionalities/transactions/model/accounting_types";
import useAccountingDbActions from "../functionalities/transactions/hook/useAccountingDbActions";
import { useBetween } from "use-between";
import useIdentity from "./useIdentity";
import observer from "./observer";
import { ICompany } from "../functionalities/company/types";
import { usePagerState } from "../hooks/usePagerState";
import { CustomHttpResponse } from "declarative-fluent-bullet-api/CustomHttpResponse";

const useFirme = () => {
  const { loggedUser } = useBetween(useIdentity);
  const [pdfAngajatCollection, setPdfAngajatCollection] = useState<string>("");
  const [angajati, setAngajati] = useState<IAngajat[]>([]);
  const {
    goToPage,
    pageState,
    pageCountAndTotalRecords,
    setPageCountAndTotalRecords,
  } = usePagerState();

  const { getAngajati, getFirme } = useAccountingDbActions();

  const [firme, setFirme] = React.useState<ICompany[]>([]);
  const [selectedFirma, setSelectedFirma] = useState<ICompany>();

  const [selectedAngajat, setSelectedAngajat] = useState<IAngajat | null>();

  const clearAngajat = useCallback(() => {
    setSelectedAngajat(null);
  }, []);

  const refreshAngajati = useCallback(() => {
    if (!selectedFirma) {
      return;
    }
    const firmaId = selectedFirma?._id;

    getAngajati(firmaId).then((val) => {
      setAngajati(val.data);
    });
  }, [selectedFirma, getAngajati]);

  useEffect(() => {
    refreshAngajati();
  }, [selectedFirma, refreshAngajati]);

  useEffect(() => {
    if (!loggedUser) {
      setFirme([]);
      setAngajati([]);
      return;
    }
    setPdfAngajatCollection(`${loggedUser.clientId}/${selectedAngajat?._id}`);
  }, [loggedUser, selectedAngajat]);

  const reload = useCallback(() => {
    setTimeout(() => {
      getFirme(pageState).then((val: CustomHttpResponse) => {
        if (!val || !val.success) {
          return;
        }
        const pagedRecords = val.data;
        setFirme(pagedRecords.records);
        setPageCountAndTotalRecords({
          pageCount: pagedRecords.pageCount,
          totalRecords: pagedRecords.count,
          // rowsPerPage: pagedRecords.rowsPerPage,
        });
      });
    }, 100);
  }, [pageState, getFirme, setPageCountAndTotalRecords]);

  useEffect(() => {
    reload();
  }, [pageState, loggedUser]);

  return {
    reload,
    refreshAngajati,
    firme,
    setFirme,
    selectedFirma,
    setSelectedFirma,
    selectedAngajat,
    setSelectedAngajat,

    clearAngajat,

    pdfAngajatCollection,
    angajati,
    pageState,
    goToPage,
    pageCountAndTotalRecords,
    setPageCountAndTotalRecords,
  };
};

export default useFirme;
