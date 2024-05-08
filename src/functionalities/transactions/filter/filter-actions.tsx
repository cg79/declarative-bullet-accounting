import useFilters from "../../../_store/useFilters";
import { useBetween } from "use-between";
import { MyButton } from "../../../_components/reuse/my-button";
import { Dialog } from "primereact/dialog";
import { LabelDate } from "../../../_components/reuse/LabelDate";
import { Chip } from "primereact/chip";
import { MyCheckbox } from "../../../_components/reuse/my-checkbox";
import { utils } from "../../../_utils/utils";

export const FilterActions = () => {
  // const [semester, setSemester] = useState(1);
  // const [semesterYear, setSemesterYear] = useState(2024);

  const {
    filters,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    showFilters,
    setShowFilters,
    toggleFilters,
    toggleFilter,
    deselectFilter,
    include,
    togleInclude,
    checkedFilters,
    deleteAllSelectedFilters,
  } = useBetween(useFilters);

  // const options = filters
  //   .filter((el) => el.value > 0)
  //   .map((el) => {
  //     el["checked"] = false;
  //     return el;
  //   });

  // const semesterNavigation = (year, semesterCount) => {
  //   const xxx = getSemesterDates(year, semesterCount);
  //   setStartDate(xxx ? xxx.startDate : 0);
  //   setEndDate(xxx ? xxx.endDate : 0);
  // };

  // useEffect(() => {
  //   semesterNavigation(semesterYear, semester);
  // }, [semesterNavigation, semesterYear]);

  return (
    <>
      <div className="fcenter">
        <MyButton
          text={showFilters ? "Ascunde Filtre" : "Arata Filtre"}
          onClick={() => {
            toggleFilters();
          }}
          useBaseButton={false}
          className="mt10 linkbutton"
        ></MyButton>
      </div>

      {checkedFilters.length > 0 && (
        <div className="fcenter mt10">
          <MyCheckbox
            id={utils.createUUID()}
            label={include ? "Contin" : "Nu Contin"}
            onChange={() => {
              togleInclude();
            }}
            checked={include}
          />
        </div>
      )}

      <div className="fcenter fwrap mt10" style={{ gap: "10px" }}>
        {checkedFilters.map((el, i) => (
          <Chip
            key={utils.createUUID()}
            label={el.label}
            removable
            onRemove={() => {
              deselectFilter(el);
            }}
            style={include ? { color: "green" } : { color: "brown" }}
          ></Chip>
        ))}
      </div>

      {checkedFilters.length > 0 && (
        <div className="fcenter mt10">
          <MyButton
            text="Stergere Filtre"
            onClick={() => {
              deleteAllSelectedFilters();
            }}
            useBaseButton={false}
            className="mt10 linkbutton"
          ></MyButton>
        </div>
      )}

      <Dialog
        header="Filtre"
        visible={showFilters}
        style={{ width: "80vw" }}
        onHide={() => setShowFilters(false)}
      >
        <>
          <div className="fcenter fwrap ">
            <div
              className="fcenter   fwrap"
              style={{ marginTop: "10px", gap: "40px" }}
            >
              <LabelDate
                label="Data Start:"
                lwidth="100px"
                data={startDate}
                onChange={(date: number) => {
                  setStartDate(date);
                }}
              ></LabelDate>

              <LabelDate
                label="Data Sfarsit:"
                lwidth="100px"
                data={endDate}
                onChange={(date: number | null) => {
                  setEndDate(date);
                  // triggerFiltering();
                }}
              ></LabelDate>
            </div>

            <div style={{ marginTop: "30px" }} className="flex fwrap fcenter">
              {filters.map((el) => (
                <div
                  className="mycardFilter"
                  style={{ marginLeft: "1px", marginTop: "1px" }}
                  // onClick={() => {
                  //   toggleFilter(el);
                  // }}
                  key={el.label}
                >
                  {/* <input
                    type="checkbox"
                    id="toggle"
                    className="checkbox"
                    checked={el["checked"]}
                  /> */}

                  {/* <label className="switch"></label> */}

                  <MyCheckbox
                    css="checkbox"
                    id={el.value}
                    value={el.value}
                    onChange={() => toggleFilter(el)}
                    label={el.label}
                    checked={el["checked"]}
                  />
                  {/* <div className="ml5" style={{ fontSize: "0.8em" }}>
                    {el.label}
                  </div> */}
                </div>
              ))}
            </div>
          </div>

          {/* <div className="fcenter" style={{ marginTop: "10px" }}>
            <div style={{ marginRight: "10px" }}>
              <span
                onClick={() => {
                  if (semester === 1) {
                    setSemesterYear((prev) => prev - 1);
                    setSemester(4);
                  } else {
                    setSemester(semester - 1);
                  }
                }}
              >
                Semestrul anterior
              </span>
            </div>
            <div>
              &nbsp; {semesterYear}/{semester}
            </div>
            <div style={{ marginLeft: "10px" }}>
              <span
                onClick={() => {
                  if (semester === 4) {
                    setSemesterYear((prev) => prev + 1);
                    setSemester(1);
                  } else {
                    setSemester(semester + 1);
                  }
                }}
              >
                Semestrul urmator
              </span>
            </div>
          </div> */}
        </>
      </Dialog>
    </>
  );
};
