import React from 'react';
import { Play } from "lucide-react";
import { Todo } from "@/models/Todo";

interface PlayIconProps {
  todo: Todo;
  onStartTodo: (todo: Todo) => void;
}

const PlayIcon: React.FC<PlayIconProps> = ({ todo, onStartTodo }) => {
  return (
    <Play className="cursor-pointer" onClick={() => onStartTodo(todo)} />
  );
};

export default PlayIcon;