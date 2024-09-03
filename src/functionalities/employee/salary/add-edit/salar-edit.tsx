import { ISalarAngajat } from '../../../transactions/model/accounting_types';
import { MyButton } from '../../../../_components/reuse/my-button';
import { useState } from 'react';
import { NumericInputComponent } from '../../../../_components/reuse/numeric-input';
import { setValueForProperty } from '../../../transactions/helpers/accounting_helpers';

export const SalarEdit = ({
  salar,
  cancelEdit,
}: {
  salar: ISalarAngajat;
  onDelete?: (item: ISalarAngajat) => void;
  cancelEdit: () => void;
  onEdit?: () => void;
}) => {
  const [item, setItem] = useState<ISalarAngajat>(salar);

  return (
    <div className="flex flexcolumn">
      <div className="flex mt10">
        <div className="actionname">
          <label className="fixw">Salar:</label>
        </div>
        <div>
          <NumericInputComponent
            value={Number(item.value)}
            onUpdate={(val) => setValueForProperty(item, val, 'value')}
          ></NumericInputComponent>
        </div>
      </div>

      <div className="flex mt10">
        <div className="actionname">
          <label className="fixw">Pensie:</label>
        </div>
        <div>
          {/* <label className="fixw">{item.taxe.pensie}</label> */}
          <NumericInputComponent
            value={Number(item.value)}
            onUpdate={(val) => setValueForProperty(item.taxe, val, 'pensie')}
          ></NumericInputComponent>
        </div>
      </div>
      <div className="flex mt10">
        <div className="actionname">
          <label className="fixw">Sanatate:</label>
        </div>
        <div>
          {/* <label className="fixw">{item.taxe.sanatate}</label> */}
          <NumericInputComponent
            value={Number(item.value)}
            onUpdate={(val) => setValueForProperty(item.taxe, val, 'sanatate')}
          ></NumericInputComponent>
        </div>
      </div>
      <div className="flex mt10">
        <div className="actionname">
          <label className="fixw">Munca:</label>
        </div>
        <div>
          {/* <label className="fixw">{item.taxe.munca}</label> */}
          <NumericInputComponent
            value={Number(item.value)}
            onUpdate={(val) => setValueForProperty(item.taxe, val, 'munca')}
          ></NumericInputComponent>
        </div>
      </div>

      <div className="flex space-between mt10">
        <div className="ml10">
          <MyButton text="Renunta" onClick={() => cancelEdit()}></MyButton>
        </div>
        <div className="ml10">
          <MyButton text="Salveaza" onClick={() => setItem(item)}></MyButton>
        </div>
      </div>

      {/* <div className="ml10">
        <MyButton
          text="Sterge"
          onClick={() => onDelete(item)}
        ></MyButton>
      </div> */}
      {/* <div className="ml10">
        <MyButton text="Salar nou" onClick={() => {onNew()}}></MyButton>
      </div> */}
    </div>
  );
};
