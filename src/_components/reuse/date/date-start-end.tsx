import { LabelDate } from '../LabelDate';

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
    <>
      <LabelDate
        label="Data Start:"
        lwidth="135px"
        data={startDate}
        onChange={(date: number | null) => {
          onStartDate(date);
        }}
      ></LabelDate>

      <div className="date-separator mt10">
        <LabelDate
          label="Data Sfarsit:"
          lwidth="135px"
          data={endDate}
          onChange={(date: number | null) => {
            onEndDate(date);
            // triggerFiltering();
          }}
        ></LabelDate>
      </div>
    </>
  );
};
export default DateStartEnd;
