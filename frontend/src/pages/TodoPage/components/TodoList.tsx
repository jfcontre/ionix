import { Todo } from "@/models/Todo";
import { TodoSkeletonList } from "./TodoSkeletonList";
import { TodoItem } from "./TodoItem";
import { Dispatch, useEffect, useState } from "react";
import { ModalDetail } from "./ModalDetail";
import { DialogDeleteTodo } from "./DialogDeleteTodo";
import { useDispatch, useSelector } from "react-redux";
import { RootState, addListTodos, initializeTodo, setSelectedTodo } from "@/store";
import ImgNoData from '/images/no_data.png'
import { TodoService } from "@/services/TodoService";
import { NotificationService } from "@/services/NotificationService";

interface Props {
  setOpenModalSave: Dispatch<React.SetStateAction<boolean>>
}
export const TodoList = ({ setOpenModalSave }: Props) => {
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todoSelect, setTodoSelect] = useState<Todo | null>(null);
  const { todos } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();

  const handleOpenModalDetail = (todo: Todo) => {
    setOpenModalDetail(true);
    setTodoSelect(todo);
  };

  const getTodos = async () => {
    try {
      const data = await TodoService.getTodos()
      dispatch(addListTodos(data))
      setIsLoading(false)
    } catch (e) {
      console.log({ e })
      setIsLoading(false)
    }
  }

  const onDelete = (todo: Todo) => {
    setOpenModalDelete(true);
    setTodoSelect(todo);
  };

  const onDetail = (todo: Todo) => handleOpenModalDetail(todo);
  const onEdit = (todo: Todo) => {
    setOpenModalSave(true)
    dispatch(setSelectedTodo(todo))
  }

  const onStart = async (todo: Todo) => {
    const todoStarted = await TodoService.startTodo(todo.id)
    dispatch(initializeTodo(todoStarted))
    NotificationService.success('The Todo was initialized successfully')
  }
  useEffect(() => {
    getTodos()
  }, []);


  const renderTodos = () => {
    if (todos.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center w-full">
          <img src={ImgNoData} alt="No data" style={{ width: '100%', height: 300 }} />
          <p className="text-center font-bold text-3xl w-full">No Todos found</p>
        </div>
      );
    }

    return todos.map(todo => (
      <div className='py-2' key={todo.id}>
        <TodoItem
          todo={todo}
          onClickDelete={onDelete}
          onClickDetail={onDetail}
          onClickEdit={onEdit}
          onStartTodo={onStart}
        />
      </div>
    ));
  };

  return (
    <>
      {isLoading ? <TodoSkeletonList /> : <>
        <p className="font-bold text-2xl py-4">Todos Counter : {todos.length}</p>
        {renderTodos()}
      </>}
      <ModalDetail
        todo={todoSelect}
        openModal={openModalDetail}
        setOpenModal={setOpenModalDetail}
      />
      <DialogDeleteTodo
        todo={todoSelect}
        setTodoSelect={setTodoSelect}
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
      />
    </>
  );
};