import { isPast, isToday, startOfDay } from "date-fns";

export const dueDateHasPassed = (dueDate: Date) => {
  const startOfDueDate = startOfDay(new Date(dueDate));
  return isPast(startOfDueDate) && !isToday(startOfDueDate);
}