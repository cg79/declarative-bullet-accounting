import { NumericInput } from "../../../_components/reuse/numeric-input";
import { utils } from "../../../_utils/utils";

// STARTING_ACCOUNT_VALUES;
export const AccountingField = ({
  label,
  onChange,
  value,
  readonly = false,
}: {
  label: string;
  onChange: (e: any) => void;
  value: number;
  readonly?: boolean;
}) => {
  // const [inputValue, setInputValue] = useState(value.toString());
  const guid = utils.createUUID();

  const css = readonly ? "" : "mt15";

  return (
    <div className="flex mt10">
      <div className={`actionname flexcolumn ${css}`}>
        <label htmlFor={guid} className="bold">
          {label}
        </label>
      </div>
      <div>
        {readonly ? (
          <label className="fixw">{value}</label>
        ) : (
          <NumericInput
            value={Number(value)}
            onUpdate={onChange}
            id={guid}
          ></NumericInput>
        )}
      </div>
    </div>
  );
};
