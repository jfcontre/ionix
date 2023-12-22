import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash, Pencil, Play } from "lucide-react";
import { Todo } from "@/models/Todo";
import { StatusTodo } from "@/constants/enums/todoStates";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { UserRole } from "@/constants/enums/authStates";

interface Props {
  todo: Todo;
  onClickDetail: (todo: Todo) => void;
  onClickDelete: (todo: Todo) => void;
  onClickEdit: (todo: Todo) => void;
  onStartTodo: (todo: Todo) => void;
}

export function TodoItem({ todo, onClickDelete, onClickEdit, onClickDetail, onStartTodo }: Props) {
  const { user } = useSelector((state: RootState) => state.auth);

  const EditIcon = () => (
    user?.role === UserRole.ADMIN && <>
      <Pencil className="cursor-pointer" onClick={() => onClickEdit(todo)} /></>
  );

  const DeleteIcon = () => (
    user?.role === UserRole.ADMIN && <>
      <Trash className="cursor-pointer" onClick={() => onClickDelete(todo)} />
    </>
  );

  const PlayIcon = () => {
    return <Play className="cursor-pointer" onClick={() => onStartTodo(todo)} />
  }

  const ShowExecutor = () => (
    user?.role === UserRole.ADMIN && <>
      <div className="py-2">{todo.executor?.username}</div>
    </>
  )

  return (
    <Card>
      <div className="flex justify-between w-full p-10 items-center">
        <div className="flex flex-col justify-center">
          <div className="font-bold">{todo.title}</div>
          <ShowExecutor />
          <Badge variant="outline">{todo.status}</Badge>
        </div>

        <div className="flex gap-4">
          <Eye className="cursor-pointer" onClick={() => onClickDetail(todo)} />
          {todo.status === StatusTodo.ASSIGNED && (
            <>
              <PlayIcon />
              <EditIcon />
              <DeleteIcon />

            </>
          )}
        </div>
      </div>
    </Card>
  );
}