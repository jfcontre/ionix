import { useDispatch, useSelector } from "react-redux";
import { RootState, addListTodos, updateStatusTodo } from "@/store";
import { TodoService } from "@/services/TodoService";
import { NotificationService } from "@/services/NotificationService";
import { StatusTodo } from "@/constants/enums/todoStatus";
import { Todo } from "@/models/Todo";
import { useEffect, useState } from "react";

export const useTodoOperations = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { todos } = useSelector((state: RootState) => state.todo);

  const handleError = (error: unknown) => {
    const message = error instanceof Error ? error.message : 'Error in the server';
    NotificationService.error(message);
  };


  const getTodos = async () => {
    try {
      const data = await TodoService.getTodos();
      dispatch(addListTodos(data));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const startTodo = async (todo: Todo) => {
    try {
      const todoResponse = await TodoService.startTodo(todo.id);
      dispatch(updateStatusTodo(todoResponse));
      NotificationService.success('The Todo was initialized successfully');
    } catch (error) {
      NotificationService.error('Error occurred while starting the Todo');
    }
  };

  const finishWithSuccess = async (todo: Todo) => {
    try {
      const todoResponse = await TodoService.updateStatusTodo(todo.id, StatusTodo.FINISHED_SUCCESS);
      dispatch(updateStatusTodo(todoResponse));
      NotificationService.success('The Todo was finished successfully');
    } catch (error) {
      handleError(error)
    }
  };

  const finishWithError = async (todo: Todo) => {
    try {
      const todoResponse = await TodoService.updateStatusTodo(todo.id, StatusTodo.FINISHED_ERROR);
      dispatch(updateStatusTodo(todoResponse));
      NotificationService.success('The Todo was finished with an error');
    } catch (error) {
      handleError(error)
    }
  };

  const setStatusWaiting = async (todo: Todo) => {
    try {
      const todoResponse = await TodoService.updateStatusTodo(todo.id, StatusTodo.ON_HOLD);
      dispatch(updateStatusTodo(todoResponse));
      NotificationService.success('The Todo was set on hold');
    } catch (error) {
      handleError(error)
    }
  };

  const leaveComment = async (todo: Todo) => {
    try {
      const todoResponse = await TodoService.updateStatusTodo(todo.id, StatusTodo.FINISHED_SUCCESS);
      dispatch(updateStatusTodo(todoResponse));
      NotificationService.success('The Todo was finished successfully');
    } catch (error) {
      handleError(error)
    }
  };

  useEffect(() => {
    getTodos()
  }, []);


  return {
    getTodos,
    startTodo,
    finishWithSuccess,
    finishWithError,
    setStatusWaiting,
    isLoading,
    todos,
    leaveComment
  };
};
