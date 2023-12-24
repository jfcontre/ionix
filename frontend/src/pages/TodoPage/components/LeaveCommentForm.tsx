import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ValidationRules } from "@/models/Form";
import { LeaveCommentTodoFormInput } from "@/models/Todo";
import { NotificationService } from "@/services/NotificationService";
import { TodoService } from "@/services/TodoService";
import { RootState, setSelectedTodo, updateTodo } from "@/store";
import { Dispatch } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const defaultValues: LeaveCommentTodoFormInput = {
  comment: '',
};
interface Props {
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
}
export const LeaveCommentForm = ({ setOpenModal }: Props) => {
  const { selectedTodo } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();
  const { control, formState: { errors, isSubmitting }, handleSubmit } = useForm({ defaultValues, shouldFocusError: true });


  const onHandleSubmit = async (data: LeaveCommentTodoFormInput) => {
    try {
      const todoResponse = await TodoService.leaveComment(selectedTodo!.id, data)
      dispatch(updateTodo(todoResponse));
      NotificationService.success('A comment has been saved successfully');
      setOpenModal(false)
      dispatch(setSelectedTodo(null))
    } catch (error) {
      if (error instanceof Error) {
        NotificationService.error(error.message)
      } else {
        NotificationService.error("Error in the server")
      }
    }
  }

  const renderInputField = (name: keyof LeaveCommentTodoFormInput, label: string, type = 'text', validationRules: ValidationRules) => (
    <div className='flex flex-col items-start'>
      <Label className='pb-2' htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={validationRules}
        render={({ field }) => (
          <Input id={name} type={type} disabled={isSubmitting} placeholder={label} {...field} />
        )}
      />
      {errors[name] && <small className="text-red-500 text-base">{errors[name]?.message}</small>}
    </div>
  );
  return (
    <form onSubmit={handleSubmit(onHandleSubmit)} autoComplete="off" className="space-y-6 w-full py-10 ">
      {renderInputField("comment", "Comment", "text", { required: "The comment is required" })}
      <Button className="w-full" disabled={isSubmitting}>Save</Button>
    </form>
  )
}
