import { useContext } from 'react';
import { AdminContext } from './AdminProvider';

export const useAdminUser = () => useContext(AdminContext);
