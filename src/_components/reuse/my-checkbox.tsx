export const MyCheckbox = ({
  value,
  onChange = (el: any) => {},
  css = "",
  name = "",
  id = "",
  checked,
  label,
}: {
  value?: boolean;
  onChange: (el: any) => void;
  css?: string;
  name?: string;
  id: string;
  checked?: boolean;
  label: string;
}) => {
  // const className = `customcheck ${css}`;

  return (
    <div className="flex" onClick={onChange}>
      <input
        name={name}
        id={id}
        type="checkbox"
        className="checkbox"
        onChange={onChange}
        value={value?.toString()}
        checked={checked}
      />
      <label className="switch"></label>
      <div className="ml5" style={{ fontSize: "0.8em", marginTop: "3px" }}>
        {label}
      </div>
    </div>
  );
};
