import { SelectButton } from "primereact/selectbutton";

export type SelectButtonsProps = {
  options: any[];
  itemTemplate: (option) => JSX.Element;
  onChange: (value: any) => void;
  value?: any;
};

export const SelectButtons = ({
  options,
  itemTemplate,
  onChange,
  value = "",
}: SelectButtonsProps) => {
  return (
    <div className="card flex justify-content-center">
      <SelectButton
        value={value}
        onChange={(e) => onChange(e.value)}
        itemTemplate={itemTemplate}
        optionLabel="value"
        options={options}
      />
    </div>
  );
};
