import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { Todo } from "@/models/Todo";
import { StatusTodo } from "@/constants/enums/todoStatus";
import EditIcon from './EditIcon';
import DeleteIcon from './DeleteIcon';
import PlayIcon from './PlayIcon';
import ShowExecutor from './ShowExecutor';
import MenuItem from "./MenuItem";
import { isDueDatePastAndStatusPending } from "@/utils/todoUtils";

interface Props {
  todo: Todo;
  onClickDetail: (todo: Todo) => void;
  onClickDelete: (todo: Todo) => void;
  onClickEdit: (todo: Todo) => void;
  onStartTodo: (todo: Todo) => void;
  onFinishWithSuccess: (todo: Todo) => void;
  onFinishWithError: (todo: Todo) => void;
  onSetStatusWaiting: (todo: Todo) => void;
  onLeaveComment: (todo: Todo) => void;
}

export function TodoItem({
  todo,
  onClickDetail,
  onClickDelete,
  onClickEdit,
  onStartTodo,
  onFinishWithError,
  onFinishWithSuccess,
  onSetStatusWaiting,
  onLeaveComment
}: Props) {


  return (
    <Card>
      <div className={`flex justify-between w-full p-10 items-center ${isDueDatePastAndStatusPending(todo) ? ' border border-red-500' : ''}`}>
        <div className="flex flex-col justify-center">
          <div className="font-bold">{todo.title}</div>
          <ShowExecutor todo={todo} />
          <Badge variant="outline">{todo.status}</Badge>
        </div>

        <div className="flex gap-4">
          <Eye className="cursor-pointer" onClick={() => onClickDetail(todo)} />
          {todo.status === StatusTodo.ASSIGNED && (
            <>
              <PlayIcon todo={todo} onStartTodo={onStartTodo} />
              <EditIcon todo={todo} onClickEdit={onClickEdit} />
              <DeleteIcon todo={todo} onClickDelete={onClickDelete} />
            </>
          )}
          <MenuItem
            todo={todo}
            onFinishWithSuccess={onFinishWithSuccess}
            onFinishWithError={onFinishWithError}
            onSetStatusWaiting={onSetStatusWaiting}
            onLeaveComment={onLeaveComment}
          />
        </div>
      </div>
    </Card>
  );
}

export default TodoItem;
