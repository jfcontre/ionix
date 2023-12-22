import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';
import { TodoForm } from './TodoForm';
import { useDispatch } from 'react-redux';
import { setSelectedTodo } from '@/store';
interface Props {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}
export const ModalForm = ({ openModal, setOpenModal }: Props) => {
  const dispatch = useDispatch();
  return (
    <Dialog open={openModal} onOpenChange={(openChange) => {
      setOpenModal(openChange)
      dispatch(setSelectedTodo(null))
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Todo</DialogTitle>
          <TodoForm setOpenModal={setOpenModal} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
