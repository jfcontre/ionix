import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { RootState } from '@/store';
import { UserRole } from '@/constants/enums/authStates';

interface AdminButtonProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminButton: React.FC<AdminButtonProps> = ({ setOpenModal }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  if(user ===null || user ===undefined) return null

  if (user.role === UserRole.ADMIN) {
    return <Button onClick={() => setOpenModal(true)}>+</Button>;
  }

  return null;
};