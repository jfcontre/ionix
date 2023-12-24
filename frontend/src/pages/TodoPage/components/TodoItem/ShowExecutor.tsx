import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { UserRole } from "@/constants/enums/authStates";
import { Todo } from "@/models/Todo";

interface ShowExecutorProps {
  todo: Todo;
}

const ShowExecutor: React.FC<ShowExecutorProps> = ({ todo }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    user?.role === UserRole.ADMIN && (
      <div className="py-2">{todo.executor?.username}</div>
    )
  );
};

export default ShowExecutor;


