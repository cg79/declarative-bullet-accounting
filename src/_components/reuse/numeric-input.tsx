import { useEffect, useRef, useState } from 'react';
import { isNumeric } from '../../functionalities/transactions/helpers/accounting_helpers';
import NumericInput from 'react-numeric-input';

export const NumericInputComponent = ({
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
  const [inputValue, setInputValue] = useState(value);
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
    <NumericInput
      // ref={inputRef}
      id={id}
      name="message"
      autoComplete="off"
      className="myInput"
      onChange={(val: number) => {
        debugger;
        // e.stopPropagation();
        if (!lastKeyRef.current) {
          return;
        }
        if (
          lastKeyRef.current === 'Backspace' ||
          lastKeyRef.current === '.' ||
          lastKeyRef.current === '-'
        ) {
          setInputValue(val);
          onUpdate(Number(val));
          return;
        }
        const isLatNumeric = isNumeric(lastKeyRef.current);
        if (!isLatNumeric) {
          return;
        }
        // const x = e.target.value;
        setInputValue(val);
        onUpdate(Number(val));
        //
      }}
      onKeyPress={(event) => {
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }}
      // onKeyDown={(event) => {
      //   console.log(event);
      //   const value = event.target.value;

      //   // Regular expression to check if the input is numeric
      //   if (!/^\d*$/.test(value)) {
      //     // Remove the last character if it's not numeric
      //     event.target.value = value.slice(0, -1);
      //   }
      //   //
      //   // k.stopPropagation();
      //   lastKeyRef.current = event.key;
      //   if (event.key === 'Enter') {
      //     event.preventDefault();
      //     onEnter && onEnter();
      //   }
      // }}
      value={inputValue}
    />
  );
};
