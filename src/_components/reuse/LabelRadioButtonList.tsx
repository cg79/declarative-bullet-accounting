import { utils } from '../../_utils/utils';
import useEvents from '../../_store/useEvents';
import RadioButtonList, { RadioButtonListProps } from './radio-button-list';
import { LabelProps, DEFAULT_LABEL_PROPS } from './LabelEmail';
import { useBetween } from '../../hooks/useBetween';

export type LabelRadioButtonListProps = LabelProps & RadioButtonListProps;

const LabelRadioButtonList: React.FC<LabelRadioButtonListProps> = ({
  label,
  lwidth = '80px',
  labelCss = 'bold',
  options,
  name,
  selectedValue,
  onChange,
  labelField,
  valueField,
}) => {
  const { triggerEnterPressed } = useBetween(useEvents);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Your code here, e.g., submit the form, call an API, etc.
      // observer.publish("ENTER_PRESSED");
      triggerEnterPressed();
    }
  };

  const id = utils.createUUID();
  return (
    <>
      <div className="flex fwrap fcenter">
        <label
          htmlFor={id}
          className={labelCss} // ${labelCss}
          style={{
            cursor: 'pointer',
            width: lwidth,
            display: 'inline-block',
          }}
        >
          {label}
        </label>
        <RadioButtonList
          onChange={onChange}
          options={options}
          name={name}
          selectedValue={selectedValue}
          labelField={labelField}
          valueField={valueField}
        />
      </div>
    </>
  );
};

export default LabelRadioButtonList;
