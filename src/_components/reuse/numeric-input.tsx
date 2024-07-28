import { useEffect, useRef, useState } from 'react';
import { isNumeric } from '../../functionalities/transactions/helpers/accounting_helpers';
import { InputText } from 'primereact/inputtext';

export const NumericInput = ({
  value,
  onUpdate,
  id,
  autoFocus = false,
  onEnter,
}: {
  value: number | null;
  onUpdate: (n: number) => void;
  id?: string;
  autoFocus?: boolean;
  onEnter?: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value ? value.toString() : '');
  const lastKeyRef = useRef('');

  useEffect(() => {
    setTimeout(() => {
      const input = inputRef?.current;
      if (input && autoFocus) {
        input.focus();
      }
    }, 0);
  }, []);

  return (
    <InputText
      ref={inputRef}
      id={id}
      name="message"
      autoComplete="off"
      // className="myInput"
      onChange={(e) => {
        // e.stopPropagation();
        if (!lastKeyRef.current) {
          return;
        }
        if (
          lastKeyRef.current === 'Backspace' ||
          lastKeyRef.current === '.' ||
          lastKeyRef.current === '-'
        ) {
          setInputValue(e.target.value);
          onUpdate(Number(e.target.value));
          return;
        }
        const isLatNumeric = isNumeric(lastKeyRef.current);
        if (!isLatNumeric) {
          return;
        }
        const x = e.target.value;
        setInputValue(x);
        onUpdate(Number(e.target.value));
        //
      }}
      onKeyDown={(k) => {
        console.log(k);
        //
        // k.stopPropagation();
        lastKeyRef.current = k.key;
        if (k.key === 'Enter') {
          k.preventDefault();
          onEnter && onEnter();
        }
      }}
      value={inputValue.toString()}
    />
  );
};
