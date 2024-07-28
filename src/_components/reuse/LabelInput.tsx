import { InputText } from 'primereact/inputtext';
import { utils } from '../../_utils/utils';
import { useEffect, useRef } from 'react';
import useEvents from '../../_store/useEvents';
import useScreenSize from '../../hooks/useScreenSize';
import { useBetween } from '../../hooks/useBetween';

export const LabelInput = ({
  label,
  labelCss = 'bold',
  onChange,
  error = '',
  value = '',
  lwidth = '80px',
  type = 'text',
  disabled = false,
  autoFocus = false,
  onCancel = () => {},
  labelStyles = {},
  inputStyles = {},
  className = 'flex fwrap fcenter',
}) => {
  const { popupCss } = useScreenSize();
  const inputRef = useRef<HTMLInputElement>(null);
  const id = utils.createUUID();
  const { triggerEnterPressed } = useBetween(useEvents);

  useEffect(() => {
    setTimeout(() => {
      const input = inputRef?.current;
      if (input && autoFocus) {
        input.focus();
      }
    }, 0);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Your code here, e.g., submit the form, call an API, etc.
      // observer.publish("ENTER_PRESSED");
      triggerEnterPressed();
    }
    if (e.key === 'Escape') {
      return onCancel && onCancel();
    }
    e.stopPropagation();
  };

  return (
    <>
      <div className={popupCss.css}>
        <label
          htmlFor={id}
          className={labelCss} // ${labelCss}
          style={{
            cursor: 'pointer',
            width: lwidth,
            display: 'inline-block',
            marginTop: '15px',
            ...labelStyles,
          }}
        >
          {label}
        </label>
        <div style={popupCss.style}>
          <InputText
            style={inputStyles}
            ref={inputRef}
            id={id}
            value={value}
            className="myInput"
            type={type}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
      {error && <div className="error mt15">{error}</div>}
    </>
  );
};
