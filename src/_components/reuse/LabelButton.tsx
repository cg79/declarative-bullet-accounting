import { InputHTMLAttributes, PropsWithChildren } from "react";
import { utils } from "../../_utils/utils";
interface MyProps
  extends PropsWithChildren<InputHTMLAttributes<HTMLInputElement>> {
  labelCss?: string;
  lwidth?: string;
  label: string;
}

export const LabelButton = ({
  labelCss = "",
  lwidth = "80px",
  label,
  children,
  ...rest
}: MyProps) => {
  const id = utils.createUUID();
  return (
    <>
      <div className="flex fwrap fcenter">
        <label
          htmlFor={id}
          className={labelCss} // ${labelCss}
          style={{
            cursor: "pointer",
            width: lwidth,
            display: "inline-block",
            marginTop: "15px",
          }}
        >
          {label}
        </label>
        <div>
          {/* <MyButton
            text={value}
            onClick={() => onChange(value)}
            className="myInput"
          ></MyButton> */}
          {children}
        </div>
      </div>
    </>
  );
};
