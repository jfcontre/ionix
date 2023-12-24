import React from 'react';
import { Todo } from "@/models/Todo";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, MoreHorizontal, XCircle, Loader,MessageCircle } from "lucide-react";
import { isDueDatePastAndStatusPending, isTodoStatusFinalized } from '@/utils/todoUtils';

interface Props {
  todo: Todo;
  onFinishWithSuccess: (todo: Todo) => void;
  onFinishWithError: (todo: Todo) => void;
  onSetStatusWaiting: (todo: Todo) => void;
  onLeaveComment: (todo: Todo) => void;
}

const MenuItem: React.FC<Props> = ({
  todo,
  onFinishWithSuccess,
  onFinishWithError,
  onSetStatusWaiting,
  onLeaveComment
}) => {

  if (isTodoStatusFinalized(todo)) return null;


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {
          !isDueDatePastAndStatusPending(todo)
            ? <>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onFinishWithSuccess(todo)} >
                <Check className="mr-2 h-4 w-4" /> Finish Successfully
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onFinishWithError(todo)} >
                <XCircle className="mr-2 h-4 w-4" /> Finish Error
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSetStatusWaiting(todo)} >
                <Loader className="mr-2 h-4 w-4" /> On Hold
              </DropdownMenuItem>
            </> :
            <DropdownMenuItem onClick={() => onLeaveComment(todo)} >
              <MessageCircle className="mr-2 h-4 w-4" /> Leave comment
            </DropdownMenuItem>
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuItem;
