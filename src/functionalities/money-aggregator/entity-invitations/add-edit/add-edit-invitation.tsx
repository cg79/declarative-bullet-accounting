import { useEffect, useState } from 'react';
import { MyButton } from '../../../../_components/reuse/my-button';
import { Tooltip } from 'react-tooltip';
import { LabelInput } from '../../../../_components/reuse/LabelInput';
import { LabelEmail } from '../../../../_components/reuse/LabelEmail';
import { helpers } from '../../../../_utils/helpers';
import { useBetween } from 'use-between';
import useEvents from '../../../../_store/useEvents';
import { utils } from 'src/_utils/utils';
import { IEntityInvitation } from '../entity-invitation-type';

export const AddEditInvitation = ({
  invitation,
  onSave,
  onCancel,
}: {
  invitation: IEntityInvitation;
  onSave: (item: IEntityInvitation) => Promise<void> | undefined;
  onCancel: () => void;
}) => {
  const { enterPressed, clearEnterPressed } = useBetween(useEvents);
  const [error, setError] = useState('');
  const [item, setItem] = useState<IEntityInvitation>({ ...invitation });
  const [isSaving, setIsSaving] = useState(false);

  const triggerSaveInvitation = () => {
    setError('');

    if (!item.email) {
      setError('Emailul trebuie sa fie completat');
      return;
    }
    if (!helpers.isValidEmail(item.email)) {
      setError('Emailul nu este valid');
      return;
    }
    setIsSaving(true);
    item.difs = utils.compareObjects(invitation, item);

    onSave(item)?.finally(() => setIsSaving(false));
  };

  useEffect(() => {
    if (!enterPressed) {
      return;
    }
    triggerSaveInvitation();
    clearEnterPressed();
  }, [enterPressed]);
  // const dataForDemisie = useCallback(() => {
  //   return item.dataDemisie ? new Date(item.dataDemisie) : new Date();
  // }, [item.dataDemisie]);

  return (
    <div className="fcenter">
      <Tooltip anchorSelect=".contpersonal" place="top">
        este folosit la import tranzactii din pdf
      </Tooltip>
      <div className="">
        <div className="flex mt10">
          <LabelInput
            label="Nume: "
            lwidth="135px"
            autoFocus
            onChange={(val: string) => {
              setError('');
              const newV: IEntityInvitation = {
                ...item,
                name: val,
              };
              setItem(newV);
            }}
            value={item.name}
          ></LabelInput>
        </div>

        <div className="flex mt10">
          <LabelEmail
            label="Email: "
            lwidth="135px"
            onChange={(val: string) => {
              setError('');
              const newV: IEntityInvitation = {
                ...item,
                email: val,
              };
              setItem(newV);
            }}
            value={item.email}
          ></LabelEmail>
        </div>

        {/* <div className="flex mt10">
          <LabelDate
            label={"Data angajare: "}
            lwidth="135px"
            onChange={(date: number) => {
              const newItem: IEntityInvitation = {
                ...item,
                dataInvitatie: date,
              };
              setItem(newItem);
            }}
            data={item.dataInvitatie}
          ></LabelDate>
        </div> */}

        <div className="error">{error}</div>

        <div className="flex space-between mt10">
          <MyButton text="Renunta" onClick={() => onCancel()}></MyButton>
          <MyButton
            text="Salveaza"
            onClick={() => triggerSaveInvitation()}
            isLoading={isSaving}
          ></MyButton>
        </div>
      </div>
    </div>
  );
};
