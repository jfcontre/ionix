import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/ui/navbar';
import { ModalForm } from './components/ModalForm';
import { TodoList } from './components/TodoList';
import { UserService } from '@/services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, addListExecutors } from '@/store';
import { UserRole } from '@/constants/enums/authStates';

export const TodoPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

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
        {
          user?.role === UserRole.ADMIN ? <Button onClick={() => setOpenModal(true)} >+</Button> : <></>
        }
        <TodoList setOpenModalSave={setOpenModal} />
        <ModalForm openModal={openModal} setOpenModal={setOpenModal} />
      </div>
    </>
  )
}
