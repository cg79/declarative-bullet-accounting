import { ISalarAngajat } from "../../../transactions/model/accounting_types";
import { MyButton } from "../../../../_components/reuse/my-button";
import { useState } from "react";
import { SalarView } from "./salar-view";
import { SalarEdit } from "../add-edit/salar-edit";
import { utils } from "../../../../_utils/utils";

export const SalariiIngajat = ({
  salarii,
  onDelete,
  onNew,
}: {
  salarii: ISalarAngajat[];
  onDelete: (item: ISalarAngajat) => void;
  onNew: () => void;
}) => {
  const [items, setItems] = useState<ISalarAngajat[]>(salarii || []);
  if (items !== salarii && salarii) {
    // don't update unnecessarily
    setItems(salarii);
  }
  const [item, setItem] = useState<ISalarAngajat | null>(null);

  const isArray = Array.isArray(items);
  console.log(items);

  const onEdit = (salar: ISalarAngajat) => {
    setItem(salar);
  };

  return (
    <div>
      {/* {JSON.stringify(items.map((el) => el.guid))} */}
      <div className="flex flex-column center-v">
        {isArray &&
          items.map((el: ISalarAngajat) => {
            return item && item.guid === el.guid ? (
              <div key={item.guid}>
                <SalarEdit
                  salar={el}
                  onEdit={() => onEdit(el)}
                  cancelEdit={() => setItem(null)}
                  key={item.guid}
                ></SalarEdit>
              </div>
            ) : (
              <div key={item?.guid}>
                <SalarView
                  salar={el}
                  onEdit={() => onEdit(el)}
                  onDelete={onDelete}
                  key={item?.guid || utils.createUUID()}
                ></SalarView>
              </div>
            );
          })}
      </div>
      <div className="ml10">
        <MyButton
          text="Salar nou"
          onClick={() => {
            onNew();
          }}
        ></MyButton>
      </div>
    </div>
  );
};
