import { useEffect, useRef } from 'react';
import { utils } from '../../_utils/utils';
import { NumericInput } from './numeric-input';
import { useBetween } from 'src/hooks/useBetween';
import useEvents from '../../_store/useEvents';
import useScreenSize from '../../hooks/useScreenSize';

export const LabelNumericInput = ({
  label,
  labelCss = 'bold',
  onChange,
  error = '',
  value = 0,
  lwidth = '160px',
  autoFocus = false,
  onEnter = () => {},
}) => {
  const { popupCss } = useScreenSize();
  const id = utils.createUUID();
  const inputRef = useRef<HTMLInputElement>(null);
  const { triggerEnterPressed } = useBetween(useEvents);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      triggerEnterPressed();
    }
    // if (e.key === "Escape") {
    //   return onCancel && onCancel();
    // }
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
          }}
        >
          {label}
        </label>
        <div style={popupCss.style}>
          <NumericInput
            id={id}
            value={value}
            autoFocus={autoFocus}
            // onChange={(e) => onChange(e.target.value)}
            onUpdate={(v) => onChange(v)}
            onEnter={onEnter}
          />
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </>
  );
};
