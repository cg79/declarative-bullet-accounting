import { useState } from 'react';

export type RadioButtonListProps = {
  options: any[];
  name: string;
  selectedValue?: string | number;
  onChange: (value: string | number) => void;
  labelField: string;
  valueField: string;
  renderOption?: (
    option: any,
    onClick: () => void,
    checked: boolean
  ) => JSX.Element;
};

const RadioButtonList: React.FC<RadioButtonListProps> = ({
  options,
  name,
  selectedValue,
  onChange,
  labelField,
  valueField,
  renderOption,
}) => {
  const [selected, setSelected] = useState<string | number | undefined>(
    selectedValue
  );

  const handleChange = (value: string) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="radio-button-list flex fwrap space-between">
      {options.map((option) => (
        <label key={option.value}>
          {/* <input
            type="radio"
            name={name}
            value={option[valueField]}
            checked={selected === option[valueField]}
            onChange={() => handleChange(option.value)}
          /> */}
          {/* {option[labelField]} */}
          {renderOption &&
            renderOption(
              option,
              () => handleChange(option.value),
              selected === option[valueField]
            )}
        </label>
      ))}
    </div>
  );
};

export default RadioButtonList;
