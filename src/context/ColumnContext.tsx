import React, { createContext, useMemo, useState } from 'react';
import { IColumn } from '../components/TaskPage';
interface ColumnContextProviderTypes {
  children: React.ReactNode;
}
interface ColumnContextInitialValueType {
  columns: IColumn[];
  setColumns?: React.Dispatch<React.SetStateAction<IColumn[]>>;
}

export const ColumnContext = createContext<ColumnContextInitialValueType | null>(null);
export const ColumnContextProvider = ({ children }: ColumnContextProviderTypes) => {
  const [columns, setColumns] = useState<IColumn[]>([
    {
      id: 1,
      title: 'Queue',
      tasks: [],
    },
    {
      id: 2,
      title: 'Development',
      tasks: [],
    },
    {
      id: 3,
      title: 'Done',
      tasks: [],
    },
  ]);
  const contextValue = useMemo(() => ({ columns, setColumns }), [columns]);

  return <ColumnContext.Provider value={contextValue}>{children}</ColumnContext.Provider>;
};
