import { useSession } from "next-auth/react";
import { create } from "zustand";

interface WeekStore {
  week: number;
  defautlWeek: number;
  year: number;
  weeksInYear: number;
  datesOfWeek: string[];
  datesOfDefaultWeek: string[];
  weekIncrement: () => void;
  weekDecrement: () => void;
  weekReset: () => void;
  weekRecord: Record<string, any>;
  updateWeekRecord: (key: string | Record<string, any>, value?: any) => void;
}

// Function to get dates of a specific week
function getWeekDates(weekNumber: number, year: number): string[] {
  const firstDayOfYear = new Date(year, 0, 1);
  const daysOffset = (weekNumber - 1) * 7;
  const firstDayOfWeek = new Date(
    firstDayOfYear.getTime() + daysOffset * 24 * 60 * 60 * 1000
  );

  // Adjust to the nearest previous Monday
  const dayOfWeek = firstDayOfWeek.getDay();
  const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() + diffToMonday);

  // Get all days in the week
  const weekDays: string[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
    weekDays.push(formatDate(day));
  }

  return weekDays;
}
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Function to get the week number of a given date
function getWeekNumber(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear =
    Math.floor(
      (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
  const weekNumber = Math.ceil(dayOfYear / 7);
  return weekNumber;
}
const currentWeek = getWeekNumber(new Date());
const currentYear = new Date().getFullYear();

const startDate: Date = new Date(currentYear, 0, 1); // January 1st of the current year
const endDate: Date = new Date(currentYear, 11, 31); // December 31st of the current year

const millisecondsInWeek: number = 7 * 24 * 60 * 60 * 1000;
const weeksInYear: number = Math.ceil(
  (endDate.getTime() - startDate.getTime()) / millisecondsInWeek
);

export const currentWeekRecord = {
  employee: "",
  employeeEmail: "",
  year: currentYear,
  week: currentWeek,
  details: [],
  committedHours: 0,
  totalHours: 0,
  overtime: 0,
  assignee: "",
  assigneeEmail: "",
  status: "IN_PROGRESS",
  mondayComment: "",
  tuesdayComment: "",
  wednesdayComment: "",
  thursdayComment: "",
  fridayComment: "",
  saturdayComment: "",
  sundayComment: "",
};

const useWeekStore = create<WeekStore>((set) => ({
  week: currentWeek,
  defautlWeek: currentWeek,
  year: currentYear,
  weeksInYear: weeksInYear,
  datesOfWeek: getWeekDates(currentWeek, currentYear),
  datesOfDefaultWeek: getWeekDates(currentWeek, currentYear),
  weekIncrement: () =>
    set((state) => {
      const newWeek = state.week + 1;
      return {
        week: newWeek,
        datesOfWeek: getWeekDates(newWeek, state.year),
      };
    }),
  weekDecrement: () =>
    set((state) => {
      const newWeek = state.week - 1;
      return {
        week: newWeek,
        datesOfWeek: getWeekDates(newWeek, state.year),
      };
    }),
  weekReset: () =>
    set((state) => ({
      week: currentWeek,
      datesOfWeek: getWeekDates(state.defautlWeek, state.year),
    })),
  weekRecord: currentWeekRecord,
  // updateWeekRecord: (key: string, value: any) =>
  //   set((state) => ({
  //     weekRecord: {
  //       ...state.weekRecord,
  //       [key]: value,
  //     },
  //   })),
  updateWeekRecord: (key: string | Record<string, any>, value?: any) =>
    set((state) => {
      if (typeof key === "object" && key !== null) {
        // If the first argument is an object, spread its properties into the state
        return {
          weekRecord: {
            ...state.weekRecord,
            ...key,
          },
        };
      } else {
        // Otherwise, treat it as a single key-value pair
        return {
          weekRecord: {
            ...state.weekRecord,
            [key]: value,
          },
        };
      }
    }),
}));

export default useWeekStore;
