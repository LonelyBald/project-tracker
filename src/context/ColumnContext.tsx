import React, { createContext, useMemo, useState } from 'react';
import { IColumn } from '../components/TaskPage';
interface ColumnContextProviderTypes {
  children: React.ReactNode;
}
interface ColumnContextInitialValueType {
  columns: IColumn[];
  setColumns?: React.Dispatch<React.SetStateAction<IColumn[]>>;
  currentProjectName: string;
  setCurrentProjectName: React.Dispatch<React.SetStateAction<string>>;
}
export const columnsInitialValue = [
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
];

export const ColumnContext = createContext<ColumnContextInitialValueType | null>(null);

export const ColumnContextProvider = ({ children }: ColumnContextProviderTypes) => {
  const [currentProjectName, setCurrentProjectName] = useState('');
  const [columns, setColumns] = useState<IColumn[]>(columnsInitialValue);
  const contextValue = useMemo(
    () => ({ columns, setColumns, currentProjectName, setCurrentProjectName }),
    [columns, currentProjectName]
  );

  return <ColumnContext.Provider value={contextValue}>{children}</ColumnContext.Provider>;
};
