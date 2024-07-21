import {
  ACCOUNTING_HISTORY,
  ACCOUNTING_START_VALUES,
  ANGAJATI,
  ANGAJAT_SALARY,
  DELTA_FUNCTION,
  FIRME,
  GENERAL_TAXES,
  INVITATIONS,
  STARTING_ACCOUNT_VALUES,
} from '../constants/accounting_constants';
import {
  IAddEditTransactionValues,
  IAccountingRecord,
  IAccountingValues,
  IAngajat,
  ICompanyTax,
  ISalarAddEdit,
  IInvitation,
} from '../model/accounting_types';
import { ICompany } from '../../company/types';
import { IPageNoAndRowsPerPage } from '../../../hooks/usePagerState';
import DEFAULT_TAXES from '../../taxes/default-taxes';
import DEFAULT_SALARIES from '../../employee/salary/list/default-salaries';
import { useCallback } from 'react';
import { helpers } from '../../../_utils/helpers';
import { useBetween } from 'use-between';
import useIdentity from '../../../_store/useIdentity';
import useApi from '../../../hooks/useApi';
import { utils } from '../../../_utils/utils';
import { IMoneyEntity } from '../../money-aggregator/money-entity/money-entity-type';
import { BULLET_METHOD } from '../../../_fluentApi/fluent/constants';
import { CustomHttpResponse } from '../../../_fluentApi/CustomHttpResponse';
import { DeltaFunction } from '../../../services/code-execution';

export type InvitationType = {
  _id: string;
  clientId: string;
  password: string;
  nick: string;
};

const useAccountingDbActions = () => {
  const { loggedUser } = useBetween(useIdentity);
  const { executeMethodFromModule, executeMethod } = useApi();

  const saveInvitation = useCallback(
    async (invitation: IInvitation) => {
      if (!loggedUser) {
        return {
          success: false,
          message: 'Nu sunteti autentificat',
        };
      }

      invitation.dataInvitatie = utils.dateToEpoch(new Date());
      return executeMethod()
        .collection((c) =>
          c
            .name(INVITATIONS(loggedUser.clientId))
            .method(BULLET_METHOD.INSERT_OR_UPDATE)
        )
        .body(invitation)
        .flow((f) =>
          f.lamda((l) =>
            l.module('user').method('sendInvitation').internalModule(true)
          )
        )
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        })
        .then((response: CustomHttpResponse) => {
          helpers.checkHttpResponseForErrors(response);
          return response;
        });
    },
    [loggedUser, executeMethod]
  );

  const deleteInvitation = useCallback(
    async (invitation: IInvitation) => {
      if (!loggedUser) {
        return {
          success: false,
          message: 'Nu sunteti autentificat',
        };
      }

      return executeMethod()
        .collection((c) =>
          c
            .name(INVITATIONS(loggedUser.clientId))
            .method(BULLET_METHOD.DELETE_ONE)
        )
        .body(invitation)
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        });
    },
    [loggedUser, executeMethod]
  );

  const getInvitations = useCallback(
    async (selectedMoneyEntity: IMoneyEntity | null) => {
      if (!loggedUser) {
        return {
          success: false,
          message: 'Nu sunteti autentificat',
          data: [],
        };
      }
      if (loggedUser.isInvited) {
        const response = await executeMethodFromModule({
          method: 'getEntitiesForInvitedUser',
          moduleName: 'user',
          body: {},
        });
        return response;
      }
      return executeMethod()
        .collection((c) =>
          c.name(INVITATIONS(loggedUser.clientId)).method(BULLET_METHOD.FIND)
        )
        .search((s) => s.findByObject({ entityId: selectedMoneyEntity?._id }))
        .sort((s) => s.field('dataInvitatie').ascending(false))
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        })
        .then((val: CustomHttpResponse) => {
          helpers.checkHttpResponseForErrors(val);
          if (val.data) {
            val.data.forEach((el: any) => (el.date = new Date(el.date)));
          }
          return val;
        });
    },
    [loggedUser, executeMethod]
  );

  const acceptInvitation = useCallback(
    async (invitation: InvitationType) => {

      const response = await executeMethodFromModule(
        {
          moduleName: 'user',
          method: 'acceptInvitation',
          body: invitation,
        },
        { allowAnonymous: true }
      );

      return response;
    },
    [executeMethodFromModule]
  );

  const getInitialAccountingValues = useCallback(
    async (selectedFirma: ICompany) => {
      return executeMethod()
        .collection((c) =>
          c
            .name(ACCOUNTING_START_VALUES(selectedFirma._id))
            .method(BULLET_METHOD.FIND_ONE)
        )
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        })
        .then((val: CustomHttpResponse) => {
          //

          helpers.checkHttpResponseForErrors(val);

          if (val.data) {
            return val.data;
          }

          return { ...STARTING_ACCOUNT_VALUES };
        });
    },
    [executeMethod]
  );

  const saveCompanyTax = useCallback(
    async (tax: ICompanyTax) => {
      return executeMethod()
        .collection((c) =>
          c.name(GENERAL_TAXES).method(BULLET_METHOD.INSERT_OR_UPDATE)
        )
        .body(tax)
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        })
        .then((val: CustomHttpResponse) => {
          helpers.checkHttpResponseForErrors(val);
          return val;
        });
    },
    [executeMethod]
  );

  const deleteCompanyTax = useCallback(
    async (tax: ICompanyTax) => {
      return executeMethod()
        .collection((c) =>
          c.name(GENERAL_TAXES).method(BULLET_METHOD.DELETE_ONE)
        )
        .body(tax)
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        });
    },
    [executeMethod]
  );

  const getAngajatSalaries = useCallback(
    async (selectedAngajat: IAngajat) => {
      return executeMethod()
        .collection((c) =>
          c.name(ANGAJAT_SALARY(selectedAngajat._id)).method(BULLET_METHOD.FIND)
        )
        .sort((s) => s.field('date').ascending(false))
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        })
        .then((val: CustomHttpResponse) => {
          if (val.data) {
            val.data.forEach((el: any) => (el.date = new Date(el.date)));
          }
          return val;
        });
    },
    [executeMethod]
  );

  const deleteAngajatSalary = useCallback(
    async (tax: ISalarAddEdit, selectedAngajat: IAngajat) => {
      return executeMethod()
        .collection((c) =>
          c
            .name(ANGAJAT_SALARY(selectedAngajat._id))
            .method(BULLET_METHOD.DELETE_ONE)
        )
        .body(tax)
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        });
    },
    [executeMethod]
  );

  const saveAngajatSalary = useCallback(
    async (tax: ISalarAddEdit, selectedAngajat: IAngajat) => {
      return executeMethod()
        .collection((c) =>
          c
            .name(ANGAJAT_SALARY(selectedAngajat._id || ''))
            .method(BULLET_METHOD.INSERT_OR_UPDATE)
        )
        .body(tax)
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        })
        .then((val: CustomHttpResponse) => {
          helpers.checkHttpResponseForErrors(val);
          return val;
        });
    },
    [executeMethod]
  );

  const getCompanyTaxes = useCallback(async () => {
    // const {startAccountingData}  = useStartAccountingData();

    // - daca nu exista, le insereaza
    return executeMethod()
      .collection((c) => c.name(GENERAL_TAXES).method(BULLET_METHOD.FIND))
      .sort((s) => s.field('date').ascending(true))
      .execute({
        beforeSendingRequest: (apiBulletJSON: any) => {
          console.log(JSON.stringify(apiBulletJSON));
        },
      })
      .then((val: CustomHttpResponse) => {
        if (val.data) {
          val.data.forEach((el: any) => (el.date = new Date(el.date)));
        }
        return val;
      });
  }, [executeMethod]);

  const deleteAngajat = useCallback(
    async (angajat: IAngajat, firmaId: string) => {
      return executeMethod()
        .collection((c) =>
          c.name(ANGAJATI(firmaId)).method(BULLET_METHOD.DELETE_ONE)
        )
        .body(angajat)
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        });
    },
    [executeMethod]
  );

  const getFirme = useCallback(
    async (pageState: IPageNoAndRowsPerPage) => {
      if (!loggedUser) {
        return new CustomHttpResponse({
          success: false,
          message: 'Nu sunteti logat',
        });
      }
      const { pageNo, rowsPerPage } = pageState;

      if (loggedUser.isInvited) {
        const response = await executeMethodFromModule({
          method: 'getCompaniesForInvitedUser',
          moduleName: 'user',
          body: {
            ...loggedUser,
            collection: { name: FIRME(loggedUser), method: 'page' },
            page: { itemsOnPage: rowsPerPage, pageNo: pageNo + 1 },
            sort: { nume: 1 },
          },
        });
        return response;
      }

      return executeMethod()
        .collection((c) =>
          c.name(FIRME(loggedUser)).method(BULLET_METHOD.PAGINATION)
        )
        .page((p) => p.itemsOnPage(rowsPerPage).pageNo(pageNo + 1))
        .sort((s) => s.field('nume').ascending(true))
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        })
        .then((val: CustomHttpResponse) => {
          helpers.checkHttpResponseForErrors(val);
          return val;
        });
    },
    [executeMethod, executeMethodFromModule, loggedUser]
  );

  const deleteCompany = useCallback(
    async (angajat: ICompany) => {
      if (!loggedUser) {
        return {
          success: false,
          message: 'Nu sunteti logat',
        };
      }
      return executeMethod()
        .collection((c) =>
          c.name(FIRME(loggedUser)).method(BULLET_METHOD.DELETE_ONE)
        )
        .body(angajat)
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        })
        .then((val: CustomHttpResponse) => {
          helpers.checkHttpResponseForErrors(val);
        });
    },
    [executeMethod]
  );

  const saveFirma = useCallback(
    async (firma: ICompany) => {
      if (!loggedUser) {
        return {
          success: false,
          message: 'Nu sunteti logat',
          data: null,
        };
      }
      return executeMethod()
        .collection((c) =>
          c.name(FIRME(loggedUser)).method(BULLET_METHOD.INSERT_OR_UPDATE)
        )
        .body(firma)
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        })
        .then((val: CustomHttpResponse) => {
          helpers.checkHttpResponseForErrors(val);
          return val;
        });
    },
    [executeMethod]
  );

  const getAngajati = useCallback(
    async (firmaId: string) => {
      return executeMethod()
        .collection((c) => c.name(ANGAJATI(firmaId)).method(BULLET_METHOD.FIND))
        .sort((s) => s.field('nume').ascending(false))
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        })
        .then((val: CustomHttpResponse) => {
          helpers.checkHttpResponseForErrors(val);
          if (val.data) {
            val.data.forEach((el: any) => (el.date = new Date(el.date)));
          }
          return val;
        });
    },
    [executeMethod]
  );

  const saveAngajat = useCallback(
    async (angajat: IAngajat, firmaId: string) => {
      // const {startAccountingData}  = useStartAccountingData();

      // - daca nu exista, le insereaza
      return executeMethod()
        .collection((c) =>
          c.name(ANGAJATI(firmaId)).method(BULLET_METHOD.INSERT_OR_UPDATE)
        )
        .body(angajat)
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        })
        .then((response: CustomHttpResponse) => {
          helpers.checkHttpResponseForErrors(response);
          return response;
        });
    },
    [executeMethod]
  );

  const getMainDeltaFunctions = useCallback(async () => {
    const response = await executeMethodFromModule({
      method: 'getMainDeltaFunctions',
      moduleName: 'bullet',

      body: {},
    });
    return response;
  }, [executeMethod]);

  const registerupdatedeltafunction = useCallback(
    async (payload: DeltaFunction) => {
      const response = await executeMethodFromModule({
        method: 'registerUpdateMainDeltaFunction',
        moduleName: 'bullet',
        body: payload,
      });
      helpers.checkHttpResponseForErrors(response);

      return response;
    },
    [executeMethod]
  );

  const setInitialAccountingValues = useCallback(
    async (selectedFirma:ICompany, accountingValues: IAccountingValues) => {
      // const {startAccountingData}  = useStartAccountingData();

      // - daca nu exista, le insereaza
      const response = await executeMethod()
        .collection((c) =>
          c
            .name(ACCOUNTING_START_VALUES(selectedFirma._id))
            .method(BULLET_METHOD.DELETE_MANY)
        )
        .flow((f) =>
          f
            .collection((c) =>
              c
                .name(ACCOUNTING_START_VALUES(selectedFirma._id))
                .method(BULLET_METHOD.INSERT)
            )
            .body(accountingValues)
        )
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        });

      helpers.checkHttpResponseForErrors(response);
      return response;
    },
    [executeMethod]
  );

  const addMultipleAccountingRecordsFromPdfImport = useCallback(
    async (
      accountingRequests: { accountingRequest: IAddEditTransactionValues }[],
      selectedAngajat: IAngajat,
      firmaId: string
    ) => {
      // - daca nu exista, le insereaza
      const response = await executeMethod()
        .page((p) => p.itemsOnPage(1).pageNo(1))
        .sort((s) => s.field('addedms').ascending(false))
        .collection((c) =>
          c
            .name(ACCOUNTING_HISTORY(selectedAngajat._id))
            .method(BULLET_METHOD.PAGINATION)
        )
        // .search((f) => f.expression("trace.previous != null"))
        .response((r) => r.key('hist_item'))
        .flow((f) =>
          f
            .mergePreviousResultToFlowResult(true)
            .page((p) => p.itemsOnPage(1).pageNo(1))
            .sort((s) => s.field('addedms').ascending(false))
            .collection((c) =>
              c
                .name(ACCOUNTING_START_VALUES(firmaId))
                .method(BULLET_METHOD.PAGINATION)
            )
            .response((r) => r.key('initial'))
        )
        .flow((f) =>
          f
            .lamda((l) =>
              l
                .traceStart((t) => t.collection('previous_casa'))
                .method('getNewContaFromObjectHistory')
                .module('my_module')
                .response((r) => r.key('previous_casa'))
            )
            .name('f_previous_casa')
        )
        .flow((f) =>
          f
            .traceStart((l) => l.collection('_country_taxes_start'))
            .mergePreviousResultToFlowResult(true)
            .collection((c) => c.name(GENERAL_TAXES).method(BULLET_METHOD.FIND))
            .sort((s) =>
              s.field('year').field('month').field('day').ascending(false)
            )
            .response((r) => r.key('country_taxes'))
            .name('country_taxes')
            .traceEnd((l) => l.collection('_country_taxes_end'))
        )
        .flow((f) =>
          f
            .mergePreviousResultToFlowResult(true)
            .collection((c) =>
              c
                .name(ANGAJAT_SALARY(selectedAngajat._id))
                .method(BULLET_METHOD.FIND)
            )
            .sort((s) =>
              s.field('year').field('month').field('day').ascending(false)
            )
            .response((r) => r.key('salaries'))
            .traceEnd((l) => l.collection('_salaries'))
        )

        .flow((f) =>
          f
            .mergePreviousResultToFlowBody(true)
            .name('')
            .description(
              'having the accountingData, it will merge also the request by using mergePreviousResultToFlowBody'
            )
            .body([...accountingRequests])
            .useForEach(true)
            .lamda((m) =>
              m
                // .traceStart((t) => t.collection("_aa11"))
                .module('my_module')
                .method(DELTA_FUNCTION)
                .traceEnd((t) =>
                  t
                    .collection(ACCOUNTING_HISTORY(selectedAngajat._id))
                    .take((p) => p.fields('newConta'))
                )
            )
            .traceStart((t) => t.collection('_xxx'))
        )
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        });

      return response;
      // processAccountingResponse(accountingResponse);

      // resetAccountingValues();
    },
    [executeMethod]
  );

  const addAccountingRecordFromPdfImport = useCallback(
    async (
      accountingRequest: IAddEditTransactionValues,
      selectedAngajat: IAngajat,
      firmaId: string
    ) => {
      if (!accountingRequest.dataTranzactie) {
        accountingRequest.dataTranzactie = accountingRequest.dataInregistrare;
      }

      // - daca nu exista, le insereaza
      const response = await executeMethod()
        .page((p) => p.itemsOnPage(1).pageNo(1))
        .sort((s) => s.field('addedms').ascending(false))
        .collection((c) =>
          c
            .name(ACCOUNTING_HISTORY(selectedAngajat._id))
            .method(BULLET_METHOD.PAGINATION)
        )
        // .search((f) => f.expression("trace.previous != null"))
        .response((r) => r.key('hist_item'))
        .flow((f) =>
          f
            .mergePreviousResultToFlowResult(true)
            .page((p) => p.itemsOnPage(1).pageNo(1))
            .sort((s) => s.field('addedms').ascending(false))
            .collection((c) =>
              c
                .name(ACCOUNTING_START_VALUES(firmaId))
                .method(BULLET_METHOD.PAGINATION)
            )
            .response((r) => r.key('initial'))
        )
        .flow((f) =>
          f
            .lamda((l) =>
              l
                .traceStart((t) => t.collection('previous_casa'))
                .method('getNewContaFromObjectHistory')
                .module('my_module')
                .response((r) => r.key('previous_casa'))
            )
            .name('f_previous_casa')
        )
        .flow((f) =>
          f
            .traceStart((l) => l.collection('_country_taxes_start'))
            .mergePreviousResultToFlowResult(true)
            .collection((c) => c.name(GENERAL_TAXES).method(BULLET_METHOD.FIND))
            .sort((s) =>
              s.field('year').field('month').field('day').ascending(false)
            )
            .response((r) => r.key('country_taxes'))
            .name('country_taxes')
            .traceEnd((l) => l.collection('_country_taxes_end'))
        )
        .flow((f) =>
          f
            .mergePreviousResultToFlowResult(true)
            .collection((c) =>
              c
                .name(ANGAJAT_SALARY(selectedAngajat._id))
                .method(BULLET_METHOD.FIND)
            )
            .sort((s) =>
              s.field('year').field('month').field('day').ascending(false)
            )
            .response((r) => r.key('salaries'))
            .traceEnd((l) => l.collection('_salaries'))
        )

        .flow((f) =>
          f
            .mergePreviousResultToFlowBody(true)
            .name('')
            .description(
              'having the accountingData, it will merge also the request by using mergePreviousResultToFlowBody'
            )
            .body({ accountingRequest })
            .lamda((m) =>
              m
                // .traceStart((t) => t.collection("_aa11"))
                .module('my_module')
                .method(DELTA_FUNCTION)
            )
            .traceStart((t) => t.collection('_xxx'))
            .traceEnd((t) =>
              t
                .collection(ACCOUNTING_HISTORY(selectedAngajat._id))
                .take((p) => p.fields('newConta'))
            )
        )
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        });

      return response;
      // processAccountingResponse(accountingResponse);

      // resetAccountingValues();
    },
    [executeMethod]
  );

  const insertAccountingAction = useCallback(
    async (
      record: IAccountingRecord,
      accountingRequest: IAddEditTransactionValues,
      selectedAngajat: IAngajat
    ) => {
      record.trace.accountingRequest = accountingRequest;
      // record.editMode = false;
      // delete record.isInsert;

      const accountingResponse = await executeMethod()
        .body(record)
        .insert(ACCOUNTING_HISTORY(selectedAngajat._id || ''))
        .execute({
          beforeSendingRequest: (apiBulletJSON: any) => {
            console.log(JSON.stringify(apiBulletJSON));
          },
        });
      console.log(accountingResponse);

      let pageNo = 1;

      const pageExpression = `trace.newConta.numar>=${record.trace.newConta.numar}`;
      const getPagedHistoryItems = async (
        selectedAngajat: IAngajat,
        pageNo: number
      ) => {
        let items = await executeMethod()
          .search((s) => s.expression(pageExpression))
          .page((p) => p.itemsOnPage(3).pageNo(pageNo))
          .collection((c) =>
            c
              .name(ACCOUNTING_HISTORY(selectedAngajat._id))
              .method(BULLET_METHOD.PAGINATION)
          )
          .execute();

        return items.data.records;
      };

      const salaries = await getAngajatSalaries(selectedAngajat);

      const country_taxes = await executeMethod()
        .find(GENERAL_TAXES)
        .sort((s) =>
          s.field('year').field('month').field('day').ascending(false)
        )
        .execute();

      let deltaRequest: any = null;
      let count = 0;
      let prevResponse: any = null;
      let records = await getPagedHistoryItems(selectedAngajat, pageNo);
      while (records && records.length) {
        for (let histItem of records) {
          deltaRequest =
            count === 0
              ? [
                  {
                    previous_casa: histItem.trace.previous,
                    country_taxes: country_taxes.data,
                    salaries,
                  },
                  {
                    accountingRequest: { ...accountingRequest },
                  },
                ]
              : [
                  {
                    previous_casa: prevResponse.newConta,
                    country_taxes: country_taxes.data,
                    salaries,
                  },
                  { accountingRequest: histItem.trace.accountingRequest },
                ];
          count = count + 1;
          // console.log(JSON.stringify(deltaRequest));
          const deltaResponse = await executeMethod()
            .body(deltaRequest)
            .collection((c) => c.method(BULLET_METHOD.LAMDA))
            .lamda((l) => l.module('my_module').method(DELTA_FUNCTION))
            .execute();

          prevResponse = deltaResponse.data;
          histItem.trace = prevResponse;

          const resp = await executeMethod()
            .body(histItem)
            .updateOne(ACCOUNTING_HISTORY(selectedAngajat._id))
            .collection((c) =>
              c
                .name(ACCOUNTING_HISTORY(selectedAngajat._id))
                .method(BULLET_METHOD.UPDATE_ONE)
            )
            .log((l) => l.collection('_acLog'))
            .execute();
          console.log(resp);
        }
        pageNo++;
        records = await getPagedHistoryItems(selectedAngajat, pageNo);
      }

      // if (prevResponse) {
      //   await executeMethod()
      //     .body(prevResponse.newConta)
      //     .update(ACCOUNTING_COLLECTION);
      // }

      // const newItems = await getHistoryDataFromDb({});
      // return newItems;
    },
    [getAngajatSalaries]
  );

  const updateAccountingAction = useCallback(
    async (
      record: IAccountingRecord,
      accountingRequest: IAddEditTransactionValues,
      selectedAngajat: IAngajat
    ) => {
      const response = await executeMethodFromModule({
        method: 'updateAccountingRecord',
        moduleName: 'accounting',
        body: {
          record,
          accountingRequest,
          angajatId: selectedAngajat._id,
        },
      });
      helpers.checkHttpResponseForErrors(response);
      return response;
    },
    [executeMethod]
  );

  const deleteAccountingRecord = useCallback(
    async (record: IAccountingRecord, angajatId: string) => {
      const accountingRequest = {
        _id: record._id,
        guid: record.trace.accountingRequest.guid,
        suma: 0,
        operationid: record.trace.accountingRequest.operationid,
        dataInregistrare: record.trace.accountingRequest.dataInregistrare,
        description: '',
        dataTranzactie: record.trace.accountingRequest.dataTranzactie,
      };

      const response = await executeMethodFromModule({
        method: 'deleteAccountingRecord',
        moduleName: 'accounting',
        body: {
          record,
          accountingRequest,
          angajatId,
        },
      });
      helpers.checkHttpResponseForErrors(response);
      return response;
    },
    [executeMethod]
  );

  const addAccountingRecord = async (
    accountingRequest: IAddEditTransactionValues,
    angajatId: string
  ) => {
    // const {startAccountingData}  = useStartAccountingData();

    // const accountingRequest: IAccountingAction = {
    //   value: accountingValues.value,
    //   operationid: accountingValues.operationid,
    //   data: getYMD(accountingValues.datetime),
    //   datetime: accountingValues.datetime,
    //   description: accountingValues.description,
    // };

    if (!accountingRequest.dataTranzactie) {
      accountingRequest.dataTranzactie = accountingRequest.dataInregistrare;
    }
    const response = await executeMethodFromModule({
      method: 'addAccountingRecord',
      moduleName: 'accounting',
      body: {
        accountingRequest,
        angajatId,
      },
    });
    helpers.checkHttpResponseForErrors(response);

    return response;
  };

  const getHistoryDataFromDb = useCallback(
    async (
      selectedAngajat: IAngajat,
      expression: string,
      pageNo = 1,
      rowsPerPage = 10
    ) => {
      // "trace.accountingRequest.operationid==1"
      const angajatId = selectedAngajat._id;
      const apiResponse = await executeMethod()
        // .search((s) => s.expression(pageExpression))
        .page((p) => p.itemsOnPage(rowsPerPage).pageNo(pageNo))
        .collection((c) =>
          c.name(ACCOUNTING_HISTORY(angajatId)).method(BULLET_METHOD.PAGINATION)
        )
        .search((s) => s.expression(expression))
        .sort((s) =>
          s.field('trace.accountingRequest.dataTranzactie').ascending(false)
        )
        .execute();

      helpers.checkHttpResponseForErrors(apiResponse);
      return apiResponse;
    },
    [executeMethod]
  );

  const importTaxe = useCallback(async () => {
    console.log('importTaxe');
    const taxe = Object.freeze({
      success: true,
      data: DEFAULT_TAXES,
    });

    const response = await executeMethod()
      .body(
        taxe.data.map((el: any) => {
          delete el._id;
          return el;
        })
      )
      .collection((c) => c.name(GENERAL_TAXES).method(BULLET_METHOD.INSERT))
      .execute();
    helpers.checkHttpResponseForErrors(response);
  }, [executeMethod]);

  const importSalariiForAngajat = useCallback(
    async (selectedAngajat: IAngajat) => {
      const salarii = {
        success: true,
        data: DEFAULT_SALARIES,
      };
      const angajatId = selectedAngajat?._id;
      const response = await executeMethod()
        .body(
          salarii.data.map((el: any) => {
            delete el._id;
            el.userid = angajatId;
            return el;
          })
        )
        .collection((c) =>
          c
            .name(ANGAJAT_SALARY(selectedAngajat?._id || ''))
            .method(BULLET_METHOD.INSERT)
        )
        .execute();
      helpers.checkHttpResponseForErrors(response);
    },
    [executeMethod]
  );

  return {
    getHistoryDataFromDb,
    updateAccountingAction,
    deleteAccountingRecord,
    registerupdatedeltafunction,
    getDeltaFunctions: getMainDeltaFunctions,
    addAccountingRecordFromPdfImport,
    getFirme,
    addAccountingRecord,
    insertAccountingAction,
    saveCompanyTax,
    deleteCompanyTax,
    getCompanyTaxes,
    saveAngajatSalary,
    deleteAngajatSalary,
    getAngajatSalaries,
    saveFirma,
    deleteCompany,
    saveAngajat,
    getAngajati,
    deleteAngajat,
    getInitialAccountingValues,
    setInitialAccountingValues,
    addMultipleAccountingRecordsFromPdfImport,
    importTaxe,
    importSalariiForAngajat,
    saveInvitation,
    deleteInvitation,
    getInvitations,
    acceptInvitation,
  };
};

export default useAccountingDbActions;
