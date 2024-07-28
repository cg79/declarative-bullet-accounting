import { SelectItemOptionsType } from 'primereact/selectitem';
import { utils } from '../../_utils/utils';
import { Dropdown } from 'primereact/dropdown';
import useScreenSize from '../../hooks/useScreenSize';

type LabelDropDownProps = {
  label?: string;
  labelCss?: string;
  value: any;
  onChange: (e: any) => void;
  error?: string;
  lwidth?: string;
  defaultOption?: any;
  options?: SelectItemOptionsType;
  placeholder?: string;
  optionLabel?: string;
  optionValue?: string;
  className?: string;
};
export const LabelDropDown = ({
  label,
  labelCss = 'bold',
  onChange,
  error = '',
  lwidth = '160px',
  defaultOption,
  value,
  options = [],
  placeholder = 'Selectati o optiune',
  optionLabel,
  optionValue = '_id',
  className = 'flex fwrap',
}: LabelDropDownProps) => {
  const id = utils.createUUID();
  const { popupCss } = useScreenSize();
  return (
    <>
      {/* {JSON.stringify(value, null, 2)} */}
      <div className={popupCss.css}>
        <div className="actionname1u">
          <label
            htmlFor={id}
            className={labelCss}
            style={{
              cursor: 'pointer',
              width: lwidth,
              display: 'inline-block',
              marginTop: '15px',
            }}
          >
            {label || 'asd'}
          </label>
        </div>
        <div className="flex checkbox-wrapper">
          <Dropdown
            options={options}
            onChange={(item) => onChange(item.value)}
            value={value || defaultOption}
            placeholder={placeholder}
            // dataKey="_id"
            optionLabel={optionLabel}
            optionValue={optionValue}
          />
        </div>
      </div>

      {error && <div className="error">{error}</div>}
    </>
  );
};
