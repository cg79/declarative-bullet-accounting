import { LabelDate } from "../LabelDate";

const DateStartEnd = ({
  onStartDate,
  onEndDate,
  startDate,
  endDate,
}: {
  onStartDate: (value: number | null) => void;
  onEndDate: (value: number | null) => void;
  startDate: number | null;
  endDate: number | null;
}) => {
  return (
    <div>
      <LabelDate
        label="Data Start:"
        lwidth="100px"
        data={startDate}
        onChange={(date: number | null) => {
          onStartDate(date);
        }}
      ></LabelDate>

      <LabelDate
        label="Data Sfarsit:"
        lwidth="100px"
        data={endDate}
        onChange={(date: number | null) => {
          onEndDate(date);
          // triggerFiltering();
        }}
      ></LabelDate>
    </div>
  );
};
export default DateStartEnd;
