import { Controller, useForm } from "react-hook-form";
import { CreateTodoFormInput } from "../../../models/Todo";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/datepicker";
import { TodoService } from "@/services/TodoService";
import { NotificationService } from "@/services/NotificationService";
import { useDispatch, useSelector } from "react-redux";
import { RootState, addNewTodo, setSelectedTodo, updateTodo } from "@/store";
import { Dispatch } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const defaultValues: CreateTodoFormInput = {
  id: 0,
  title: "",
  description: "",
  dueDate: new Date(),
  executorId: 0
}
interface Props {
  setOpenModal: Dispatch<React.SetStateAction<boolean>>
}
export const TodoForm = ({ setOpenModal }: Props) => {
  const dispatch = useDispatch();
  const { listExecutors, selectedTodo } = useSelector((state: RootState) => state.todo);

  const getDataFromTable = () => {
    if (selectedTodo !== null) {
      const newValue: CreateTodoFormInput = {
        id: selectedTodo.id,
        title: selectedTodo.title,
        description: selectedTodo.description,
        dueDate: new Date(selectedTodo.dueDate),
        executorId: selectedTodo.executorId
      }
      return newValue
    }
    return defaultValues

  }
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm({ defaultValues: getDataFromTable(), shouldFocusError: true });



  const getFormErrorMessage = (name: string): JSX.Element | boolean => {
    const key = name as keyof CreateTodoFormInput;
    return (
      errors[key] != null && (
        <small className="text-red-500 text-base">{errors[key]?.message}</small>
      )
    );
  };

  const onHandleSubmit = async (data: any) => {
    data.executorId = parseInt(data.executorId)
    if (selectedTodo !== null) {

      const todoUpdated = await TodoService.updateTodo(data)
      dispatch(updateTodo(todoUpdated))
    } else {
      const todoCreated = await TodoService.createTodo(data)
      dispatch(addNewTodo(todoCreated))

    }
    dispatch(setSelectedTodo(null))
    NotificationService.success(`Todo has been successfully saved`)
    setOpenModal(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onHandleSubmit)}
      autoComplete="off"
      className="space-y-6 w-full py-10"
    >
      <div className='flex flex-col'>
        <Label className='pb-2' htmlFor="title">Title</Label>
        <Controller
          name="title"
          control={control}
          rules={{ required: "The title is required" }}
          render={({ field }) => (
            <Input id='title' disabled={isSubmitting} placeholder="Title" {...field} />
          )}
        />
        {getFormErrorMessage('title')}
      </div>
      <div className='flex flex-col'>
        <Label className='pb-2' htmlFor="description">Description</Label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "The description is required" }}
          render={({ field }) => (
            <Textarea id='description' disabled={isSubmitting} placeholder="Description" {...field} />
          )}
        />
        {getFormErrorMessage('description')}
      </div>

      <div className='flex flex-col'>
        <Label className='pb-2' htmlFor="dueDate">Due Date</Label>
        <Controller
          name="dueDate"
          control={control}
          rules={{
            required: "The due date is required",
            validate: {
              notBeforeToday: value => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selectedDate >= today || "The due date cannot be in the past";
              }
            }
          }}
          render={({ field }) => (
            <DatePicker dateValue={new Date(field.value)} onSelectDate={(date) => { field.onChange(date) }} />
          )}
        />
        {getFormErrorMessage('dueDate')}
      </div>
      <div className='flex flex-col'>
        <Label className='pb-2' htmlFor="executorId">Assign Executor</Label>
        <Controller
          name="executorId"
          control={control}
          rules={{ required: 'The excutor is requierd', validate: (e) => e == 0 ? 'The executor is required' : true }}
          render={({ field }) => (
            <Select
              disabled={isSubmitting}
              onValueChange={field.onChange}
              value={field.value.toString()}
              defaultValue={field.value.toString()}
            >
              <SelectTrigger>
                <SelectValue id='executorId' defaultValue={field.value} placeholder="Select an executor" />
              </SelectTrigger>
              <SelectContent>
                {listExecutors.map((typeProduct) => (
                  <SelectItem key={typeProduct.id} value={typeProduct.id!.toString()}>{typeProduct.username}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {getFormErrorMessage('executorId')}
      </div>

      <Button >Save</Button>
    </form>
  )
}
