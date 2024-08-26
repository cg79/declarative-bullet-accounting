import { utils } from '../../_utils/utils';
import useEvents from '../../_store/useEvents';
import RadioButtonList, { RadioButtonListProps } from './radio-button-list';
import { LabelProps, DEFAULT_LABEL_PROPS } from './LabelEmail';
import { useBetween } from '../../hooks/useBetween';
import useScreenSize from '../../hooks/useScreenSize';

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
  renderOption,
}) => {
  const { triggerEnterPressed } = useBetween(useEvents);
  const { popupCss } = useScreenSize();

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
      <div className={`${popupCss.css} `} key={id}>
        {label && (
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
        )}

        <RadioButtonList
          renderOption={renderOption}
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
