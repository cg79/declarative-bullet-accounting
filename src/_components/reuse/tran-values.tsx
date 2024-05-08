import { utils } from "../../_utils/utils";

export const TranValues = ({ old = 0, neww = 0 }) => {
  return (
    <div className="flex justify-between">
      <div
        style={{
          fontSize: "0.9em",
        }}
      >
        {utils.toFixed(old)}
      </div>
      <div>&#8594;</div>

      <div
        className=""
        style={{
          fontSize: "0.9em",
        }}
      >
        {utils.toFixed(neww)}
      </div>
    </div>
  );
};
