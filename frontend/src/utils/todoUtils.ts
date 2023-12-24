import { StatusTodo } from "@/constants/enums/todoStatus";
import { Todo } from "@/models/Todo";
import { isPast, isToday, startOfDay } from "date-fns";

export const isDueDatePastAndStatusPending = (todo: Todo): boolean => {
  const startOfDueDate = startOfDay(new Date(todo.dueDate));
  const dueDateHasPassed = isPast(startOfDueDate) && !isToday(startOfDueDate);
  const isStatusPending = [
    StatusTodo.ASSIGNED,
    StatusTodo.INITIATED,
    StatusTodo.ON_HOLD,
  ].includes(todo.status);

  return dueDateHasPassed && isStatusPending;
};

export const isTodoStatusFinalized = (todo: Todo):boolean => {
  if (todo.status === StatusTodo.ASSIGNED ||
    todo.status === StatusTodo.FINISHED_ERROR ||
    todo.status === StatusTodo.FINISHED_SUCCESS) {
    return true
  }
  return false
}