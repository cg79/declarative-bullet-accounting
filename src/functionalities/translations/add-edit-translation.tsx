import { useBetween } from 'use-between';
import { ITranslations } from './types';
import useEvents from '../../_store/useEvents';
import { useEffect, useState } from 'react';
import { LabelInput } from '../../_components/reuse/LabelInput';
import { MyButton } from '../../_components/reuse/my-button';

export const AddEditTranslation = ({
  moneyEntity,
  onSave,
  onCancel,
}: {
  moneyEntity: ITranslations;
  onSave: (moneyTransaction: ITranslations) => void;
  onCancel: () => void;
}) => {
  const { enterPressed, clearEnterPressed } = useBetween(useEvents);
  const [error, setError] = useState('');
  const [currentEntity, setCurrentEntity] =
    useState<ITranslations>(moneyEntity);

  const triggerSaveCategory = () => {
    setError('');

    if (!currentEntity?.key) {
      setError('invalid key');
      return;
    }
    onSave(currentEntity);
  };

  useEffect(() => {
    if (!enterPressed) {
      return;
    }
    triggerSaveCategory();
    clearEnterPressed();
  }, [enterPressed]);

  return (
    <div className="fcenter">
      <div>
        <div className="flex mt10">
          <LabelInput
            autoFocus
            label="Key: "
            lwidth="135px"
            // autoFocus
            onChange={(val: string) => {
              setError('');
              const newV: ITranslations = {
                ...currentEntity,
                key: val,
              };
              setCurrentEntity(newV);
            }}
            value={currentEntity?.key}
          ></LabelInput>
        </div>

        <div className="flex mt10">
          <LabelInput
            label="Value: "
            lwidth="135px"
            // autoFocus
            onChange={(val: string) => {
              setError('');
              const newV: ITranslations = {
                ...currentEntity,
                value: val,
              };
              setCurrentEntity(newV);
            }}
            value={currentEntity?.value}
          ></LabelInput>
        </div>

        <div className="error">{error}</div>
        <div className="flex space-between mt15">
          <MyButton text="Renunta" onClick={() => onCancel()}></MyButton>
          <MyButton
            text="Salveaza"
            onClick={() => triggerSaveCategory()}
          ></MyButton>
        </div>
      </div>
    </div>
  );
};

export default AddEditTranslation;
