import React from 'react';
import { Trash } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { UserRole } from "@/constants/enums/authStates";
import { Todo } from "@/models/Todo";

interface DeleteIconProps {
  todo: Todo;
  onClickDelete: (todo: Todo) => void;
}

const DeleteIcon: React.FC<DeleteIconProps> = ({ todo, onClickDelete }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    user?.role === UserRole.ADMIN && (
      <Trash className="cursor-pointer" onClick={() => onClickDelete(todo)} />
    )
  );
};

export default DeleteIcon;