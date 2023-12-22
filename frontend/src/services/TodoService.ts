import { CreateTodoFormInput, Todo } from "../models/Todo";
import { apiFetch } from "../utils/fetch";
import { endpointsApi } from "@/constants/endpoints";

/**
 * The TodoService instance.
 */
class _TodoService {
  /**
   * Allows to get all todos
   * @returns 
   */
  async getTodos(): Promise<Todo[]> {
    const res = await apiFetch<Todo[]>('GET', endpointsApi.todo.base)
    return res
  }

  /**
  * Allows to create a todo
  * @returns  A todo created 
  */
  async createTodo(data: CreateTodoFormInput): Promise<Todo> {
    const res = await apiFetch<Todo>('POST', endpointsApi.todo.base, data)
    return res
  }

  /**
 * Allows to update a todo
 * @returns  A todo updated
 */
  async updateTodo(data: CreateTodoFormInput): Promise<Todo> {
    const res = await apiFetch<Todo>('PUT', `${endpointsApi.todo.base}/${data.id}`, data)
    return res
  }

  /**
* Allows to start a todo
* @returns  A todo started
*/
  async startTodo(id: number): Promise<Todo> {
    const res = await apiFetch<Todo>('PUT', `${endpointsApi.todo.base}/startTodo/${id}`)
    return res
  }

  /**
 * Allows to delete  a todo
 * @returns  A todo deleted
 */
  async deleteTodo(id: number): Promise<Todo> {
    const res = await apiFetch<Todo>('DELETE', `${endpointsApi.todo.base}/${id}`)
    return res
  }
}

export const TodoService = new _TodoService();