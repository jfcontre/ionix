import { useEffect, useState } from 'react';
import { Navbar } from '@/components/ui/navbar';
import { ModalForm } from './components/ModalForm';
import { TodoList } from './components/TodoList';
import { UserService } from '@/services/UserService';
import { useDispatch } from 'react-redux';
import { addListExecutors } from '@/store';
import { AdminButton } from './components/RenderAdminButton';

export const TodoPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch();

  const getUsersExecutors = async () => {
    const listExecutors = await UserService.getUsersExecutors()
    dispatch(addListExecutors(listExecutors))
  }

  useEffect(() => {
    getUsersExecutors()
  }, []);

  return (
    <>
      <Navbar />
      <div className='mx-auto container max-w-[500px]'>
        <h1 className='text-4xl font-bold text-center py-10'>Todo List</h1>
        <AdminButton
          setOpenModal={setOpenModal}
        />
        <TodoList
          setOpenModalSave={setOpenModal}
        />
        <ModalForm
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </div>
    </>
  )
}
