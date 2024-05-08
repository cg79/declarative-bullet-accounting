import { InputHTMLAttributes, PropsWithChildren } from "react";

interface MyButtonProps
  extends PropsWithChildren<InputHTMLAttributes<HTMLInputElement>> {
  onClick: () => void;
  text: string;
  // css?: string;
  disabled?: boolean;
  useBaseButton?: boolean;
}

export const MyButton = ({
  text,
  useBaseButton = true,
  children,
  ...rest
}: MyButtonProps) => {
  return (
    <button
      className={
        useBaseButton ? `basebutton ${rest.className}` : rest.className
      }
      onClick={rest.onClick}
      disabled={rest.disabled}
    >
      {children || text}
    </button>
  );
};
