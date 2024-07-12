import { useState } from "react";

export type RadioButtonListProps = {
  options: any[];
  name: string;
  selectedValue?: string | number;
  onChange: (value: string | number) => void;
  labelField: string;
  valueField: string;
};

const RadioButtonList: React.FC<RadioButtonListProps> = ({
  options,
  name,
  selectedValue,
  onChange,
  labelField,
  valueField,
}) => {
  const [selected, setSelected] = useState<string | number | undefined>(
    selectedValue
  );

  const handleChange = (value: string) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="radio-button-list flex fwrap">
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option[valueField]}
            checked={selected === option[valueField]}
            onChange={() => handleChange(option.value)}
          />
          {option[labelField]}
        </label>
      ))}
    </div>
  );
};

export default RadioButtonList;
