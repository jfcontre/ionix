import { createSlice } from '@reduxjs/toolkit';
import { type Todo } from '@/models/Todo';
import { User } from '@/models/User';
import { StatusTodo } from '@/constants/enums/todoStates';

export interface TodoState {
  todos: Todo[]
  listExecutors: User[]
  selectedTodo: Todo | null
}

const initialState: TodoState = {
  todos: [],
  listExecutors: [],
  selectedTodo: null
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addNewTodo: (state, { payload }) => {
      state.todos = [payload, ...state.todos];
    },
    updateTodo: (state, { payload }) => {
      state.todos = state.todos.map(todo => {
        if (todo.id === payload.id) {
          return payload;
        }
        return todo;
      });
    },
    addListTodos: (state, { payload }) => {
      state.todos = [...payload]
    },
    initializeTodo: (state, { payload }) => {
      state.todos = state.todos.map(todo => {
        if (todo.id === payload.id) {
          return { ...todo, status:StatusTodo.INITIATED  };
        }
        return todo;
      });
    },
    addListExecutors: (state, { payload }) => {
      state.listExecutors = [...payload]
    },
    removeTodo: (state, { payload }) => {
      const todosFilter = state.todos.filter(todo => todo.id !== payload)
      state.todos = [...todosFilter]
    },
    setSelectedTodo: (state, { payload }) => {
      state.selectedTodo = payload
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  addNewTodo,
  addListTodos,
  removeTodo,
  addListExecutors,
  setSelectedTodo,
  updateTodo,
  initializeTodo
} = todoSlice.actions;