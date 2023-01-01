import SyntaxHighlighter from "react-syntax-highlighter";

export const Home = () => {

  const text = `
  const accountingResponse = await createDeclarativeBulletApi()
      .findOne(ACCOUNTING_COLLECTION)
      .search((f) => f.findByObject({ guid }))
      //1. find the accounting record, by using the 'guid' value, into the ACCOUNTING_COLLECTION
      .flow((f) =>
        f
          .executeIf((e) =>
            e.moduleFunction((m) => m.module("my_module").method("not_exists"))
          )
          //2. if the accounting record is not found, then create a new one
          // below instructions are executed only if the 'executeIf' condition is true
          // "not_exists" function is defined in the 'functions' section of the application

          .collection((c) =>
            c.name(ACCOUNTING_COLLECTION).method(BULLET_METHOD.INSERT)
          )
          .body(startAccountingData)
          .flow((f) =>
            f
              .body({input: 5000})
              .mergePreviousResultToFlowBody(true) //3. merge the result of the previous instruction into the body of the current instruction
              .merge((m) =>
                m
                  .traceStart((t) => t.collection("_merge1"))
                  .module("my_module")
                  .method("accounting1")
              )
              //4. call the 'accounting1' function, defined in the 'functions' section of the application
              // by using [body, previousObj] as input parameters
              // the input values can be seen in _merge1 collection
              .response((r) =>
                r
                  .fields("newConta")
                  .traceStart((t) => t.collection(ACCOUNTING_HISTORY))
              )
              //5. insert the response of the 'accounting1' function into the ACCOUNTING_HISTORY collection by using traceStart
              // AND
              // take only the "newConta" object from the response of the 'accounting1' function
              .flow((f) =>
                f
                  .updateOne(ACCOUNTING_COLLECTION)
                  .mergePreviousResultToFlowBody(true)
                  .search((f) => f.findByObject({ guid }))
                  //6. update the accounting record, by using the 'guid' value, into the ACCOUNTING_COLLECTION
                  .flow((f) =>
                    f
                      .name("paginated_history")
                      .saveForLaterUse(true)
                      //7. save the flow as "paginated_history" for later use
                      // the flow can be tested from the "flow" section of the application

                      .page((p) => p.itemsOnPage(5).pageNo(1))
                      .sort((s) => s.field("addedms").ascending(false))
                      .collection((c) =>
                        c
                          .name(ACCOUNTING_HISTORY)
                          .method(BULLET_METHOD.PAGINATION)
                      )
                      // 8. get the paginated history of the accounting records
                      .join((j) =>
                        j
                          .key("user")
                          .with((w) =>
                            w.field("_id").collection((c) => c.name("zsys-users"))
                          )
                          .field("trace.newConta.userid")
                          .response(t=>t.fields("_id,email"))
                          
                      )
                      //9. join the paginated history with the "zsys-users" collection 
                      // ,take only the "_id" and "email" fields
                      // and save the result into the "user" field
                  )
              )
          )
      )
      .execute({
        beforeSendingRequest: (apiBulletJSON: any) => {
          console.log(JSON.stringify(apiBulletJSON));
        },
      });
  `
  return (
  <SyntaxHighlighter language="javascript">
    {text}
  </SyntaxHighlighter>)
};
