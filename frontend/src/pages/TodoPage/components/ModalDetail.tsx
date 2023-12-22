import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch } from "react";
import { Todo } from "@/models/Todo";
import { formatDate } from "@/lib/utils";

interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
  todo: Todo | null;
}

export const ModalDetail = ({ openModal, setOpenModal, todo }: Props) => {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className=" p-4 rounded-lg">
        <DialogHeader className="border-b pb-2">
          <DialogTitle className="text-xl font-bold">{todo?.title}</DialogTitle>
        </DialogHeader>
        <div className="pt-4">
          <DialogDescription className="text-gray-700">{todo?.description}</DialogDescription>
          <div className="flex flex-col pt-2">
            <div className="pt-2">
              <span className="font-semibold">Due Date:</span>
              <span className="pl-2 text-gray-600">{formatDate(todo?.dueDate)}</span>
            </div>
            <div className="pt-2">
              <span className="font-semibold">Status:</span>
              <span className="pl-2 text-gray-600">{todo?.status}</span>
            </div>
            <div className="pt-2">
              <span className="font-semibold">Executor:</span>
              <span className="pl-2 text-gray-600">{todo?.executor?.username}</span>
            </div>
            <div className="pt-2">
              <span className="font-semibold">Comments:</span>
              <span className="pl-2 text-gray-600">{todo?.comment}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};