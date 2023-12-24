import React from 'react';
import { Pencil } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { UserRole } from "@/constants/enums/authStates";
import { Todo } from "@/models/Todo";

interface EditIconProps {
  todo: Todo;
  onClickEdit: (todo: Todo) => void;
}

const EditIcon: React.FC<EditIconProps> = ({ todo, onClickEdit }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    user?.role === UserRole.ADMIN && (
      <Pencil className="cursor-pointer" onClick={() => onClickEdit(todo)} />
    )
  );
};

export default EditIcon;