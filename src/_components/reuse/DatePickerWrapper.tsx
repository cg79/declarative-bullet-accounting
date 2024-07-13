import DatePicker from "react-datepicker";
import { utils } from "../../_utils/utils";
import { Calendar } from "primereact/calendar";
const DatePickerWrapper = ({
  inputRef,
  data,
  onChange,
}: {
  inputRef?: any;
  data: number | null;
  onChange: (date: any) => void;
}) => {
  return (
    <div>
      <Calendar
        ref={inputRef}
        value={data ? utils.epochToDate(data) : null}
        onChange={(date: any) => {
          debugger;
          const dateValue = date.value;
          onChange(utils.dateToEpoch(dateValue));
        }}
      />
    </div>
    // <div>
    //   <DatePicker
    //     ref={inputRef}
    //     selected={data ? utils.epochToDate(data) : null}
    //     onChange={(date: Date) => onChange(utils.dateToEpoch(date))}
    //     showYearDropdown={true}
    //     showMonthDropdown={true}
    //   />
    // </div>
  );
};

export default DatePickerWrapper;
