import { utils } from "../../../_utils/utils";

interface SemesterDates {
  startDate: number;
  endDate: number;
}

export const getSemesterDates = (
  academicYear: number,
  semesterNumber: number
): SemesterDates | null => {
  // Define the start and end months for each semester
  const semesterMonths: Record<number, [number, number]> = {
    1: [1, 3],
    2: [4, 6],
    3: [7, 9],
    4: [10, 12],
  };

  //   // Validate semester number
  //   if (![1, 2].includes(semesterNumber)) {
  //     console.error("Invalid semester number");
  //     return null;
  //   }

  // Calculate start and end dates
  const startDate = new Date(
    academicYear,
    semesterMonths[semesterNumber][0] - 1,
    1
  );
  // -1 because months are 0-indexed
  const endDate = new Date(academicYear, semesterMonths[semesterNumber][1], 0); // Last day of previous month

  return {
    startDate: utils.dateToEpoch(startDate),
    endDate: utils.dateToEpoch(endDate),
  };
};

// // Example usage:
// const semester1Dates = getSemesterDates(2024, 1);
// if (semester1Dates) {
//   console.log(
//     "Semester 1 Start Date:",
//     semester1Dates.startDate.toLocaleDateString()
//   );
//   console.log(
//     "Semester 1 End Date:",
//     semester1Dates.endDate.toLocaleDateString()
//   );
// }
