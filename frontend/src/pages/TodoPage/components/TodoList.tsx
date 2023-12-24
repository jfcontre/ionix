import { Todo } from "@/models/Todo";
import { TodoSkeletonList } from "./TodoSkeletonList";
import { TodoItem } from "./TodoItem/TodoItem";
import { Dispatch, useState } from "react";
import { ModalDetail } from "./ModalDetail";
import { DialogDeleteTodo } from "./DialogDeleteTodo";
import { useDispatch } from "react-redux";
import { setSelectedTodo } from "@/store";
import { TodoListEmpty } from "./TodoListEmpty";
import { TodoLabelCounter } from "./TodoLabelCounter";
import { useTodoOperations } from "@/hooks/useTodoOperation";
import { ModalLeaveComment } from "./ModalLeaveComment";

interface Props {
  setOpenModalSave: Dispatch<React.SetStateAction<boolean>>
}

export const TodoList = ({ setOpenModalSave }: Props) => {
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalLeaveComment, setOpenModalLeaveComment] = useState(false);
  const [todoSelect, setTodoSelect] = useState<Todo | null>(null);
  const dispatch = useDispatch();
  const { startTodo, finishWithSuccess, finishWithError, setStatusWaiting, isLoading, todos  } = useTodoOperations();

  const handleOpenModalDetail = (todo: Todo) => {
    setOpenModalDetail(true);
    setTodoSelect(todo);
  }

  const onDelete = (todo: Todo) => {
    setOpenModalDelete(true);
    setTodoSelect(todo);
  }

  const onDetail = (todo: Todo) => handleOpenModalDetail(todo);

  const onEdit = (todo: Todo) => {
    setOpenModalSave(true)
    dispatch(setSelectedTodo(todo))
  }

  const onLeaveComment = (todo: Todo) => {
    setOpenModalLeaveComment(true)
    dispatch(setSelectedTodo(todo))
  }

  const renderTodos = () => {
    if (todos.length === 0) return <TodoListEmpty />

    return todos.map(todo => (
      <div className='py-2' key={todo.id}>
        <TodoItem
          todo={todo}
          onClickDelete={onDelete}
          onClickDetail={onDetail}
          onClickEdit={onEdit}
          onStartTodo={startTodo}
          onFinishWithError={finishWithError}
          onFinishWithSuccess={finishWithSuccess}
          onSetStatusWaiting={setStatusWaiting}
          onLeaveComment={onLeaveComment}
        />
      </div>
    ));
  };

  return (
    <>
      {isLoading
        ? <TodoSkeletonList />
        : <> <TodoLabelCounter count={todos.length} /> {renderTodos()} </>
      }
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
      <ModalLeaveComment
        openModal={openModalLeaveComment}
        setOpenModal={setOpenModalLeaveComment}
      />
    </>
  );
};