import { LabelTooltip } from "../../../../_components/reuse/LabelTooltip";
import { TranValues } from "../../../../_components/reuse/tran-values";
import { utils } from "../../../../_utils/utils";

const TitleOldNew = ({
  title,
  old,
  neww,
}: {
  title: string;
  old: number;
  neww: number;
}) => {
  const equal = old === neww;
  const css = equal ? "" : "bold";

  return (
    <div className="flex space-between mt5">
      <div>
        <LabelTooltip
          label={title}
          labelCss={css}
          tooltip={equal ? "" : utils.toFixed(neww - old).toString()}
        ></LabelTooltip>
      </div>
      <TranValues old={old} neww={neww}></TranValues>
    </div>
  );
};

export { TitleOldNew };
