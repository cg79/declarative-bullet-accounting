import { useEffect, useState } from 'react';
import { utils } from '../../_utils/utils';
import { MyCheckbox } from './my-checkbox';

export type CheckBoxListProps = {
  options: any[];
  name: string;
  // onChange: (value: string | number) => void;
  labelField: string;
  valueField: string;
  renderOption?: (
    option: any,
    onClick: () => void,
    checked: boolean
  ) => JSX.Element;
  onItemsSelected: (selectedItems: any[]) => void;
};

const CheckBoxList: React.FC<CheckBoxListProps> = ({
  options,
  name,
  // onChange,
  labelField,
  valueField,
  renderOption,
  onItemsSelected,
}) => {
  const [workOptions, setWorkOptions] = useState<any[]>([...(options || [])]);

  useEffect(() => {
    setWorkOptions(options);
  }, [options]);

  const onElementChanged = () => {
    const selectedItems: any = [];
    const newOptions = workOptions.map((el) => {
      if (el.checked) {
        selectedItems.push(el);
      }
      return el;
    });
    setWorkOptions(newOptions);
    onItemsSelected(selectedItems);
  };

  return (
    <div className="radio-button-list flex fwrap space-between">
      {workOptions.map((option) => (
        <label key={utils.createUUID()}>
          <MyCheckbox
            label={option[labelField] || 'checkhere'}
            onChange={() => {
              option.checked = !!!option.checked;
              onElementChanged();
            }}
            id={utils.createUUID()}
            name={name}
            checked={option.checked}
          ></MyCheckbox>
          {/* {option[labelField]} */}
          {/* {renderOption &&
            renderOption(
              option,
              () => handleChange(option.value),
              selected === option[valueField]
            )} */}
        </label>
      ))}
    </div>
  );
};

export default CheckBoxList;
