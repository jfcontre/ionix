
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Todo } from '@/models/Todo'
import { NotificationService } from '@/services/NotificationService'
import { TodoService } from '@/services/TodoService'
import { removeTodo } from '@/store'
import { Dispatch } from 'react'
import { useDispatch } from 'react-redux'

interface Props {
  openModal: boolean
  setOpenModal: Dispatch<React.SetStateAction<boolean>>
  todo: Todo | null
  setTodoSelect: Dispatch<React.SetStateAction<Todo | null>>
}
export const DialogDeleteTodo = ({ openModal, setOpenModal, todo, setTodoSelect }: Props) => {
  const dispatch = useDispatch();
  const onDelete = async () => {
    await TodoService.deleteTodo(todo!.id)
    dispatch(removeTodo(todo!.id))
    NotificationService.error(`Todo ${todo?.title} has been successfully deleted`)
    setOpenModal(false)
    setTodoSelect(null)
  }

  return (
    <AlertDialog open={openModal} onOpenChange={(openChange) => {
      setOpenModal(openChange)
      setTodoSelect(null)
    }
    }>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure delete the todo <strong>{todo?.title}</strong> ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your todo
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={onDelete}>Accept</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}
