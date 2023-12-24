import { Dispatch } from "react";
import { LeaveCommentForm } from "./LeaveCommentForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { setSelectedTodo } from "@/store";
import { useDispatch } from "react-redux";

interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
}

export const ModalLeaveComment = ({ openModal, setOpenModal }: Props) => {
  const dispatch = useDispatch();
  const onOpenChange = (openChange: boolean) => {
    setOpenModal(openChange)
    dispatch(setSelectedTodo(null))
  }

  return (
    <Dialog open={openModal} onOpenChange={onOpenChange}>
      <DialogContent className=" p-4 rounded-lg">
        <DialogHeader className="border-b pb-2">
          <DialogTitle className="text-xl font-bold">Leave a comment</DialogTitle>
          <div className="pt-4">
            <LeaveCommentForm setOpenModal={setOpenModal} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
