import { useContext } from 'react';
import { ColumnContext } from '../context/ColumnContext';

export const useColumns = () => {
  const context = useContext(ColumnContext);

  if (!context) {
    throw new Error('Use useColumn inside Provider');
  }

  const { columns, setColumns } = context;

  return { columns, setColumns };
};
