import React from 'react';
import { Trash } from '../assets/svg/Trash';
import { useColumns } from '../hooks/useColumns';
import { IColumn, ITask } from './TaskPage';

export interface IBoard {
  task: ITask;
  column: IColumn;
}

export const ClearTask = ({ task, column }: IBoard) => {
  const { columns, setColumns } = useColumns();

  const CLEAN_MESSAGE = 'Do you want to delete task?';

  const onClickClear = () => {
    const columnsCopy = [...columns];
    if (window.confirm(CLEAN_MESSAGE)) {
      column.tasks.splice(column.tasks.indexOf(task), 1);
    }
    if (setColumns) {
      setColumns(columnsCopy);
    }
  };

  return (
    <div className="item__edit__trash" onClick={onClickClear}>
      <Trash />
    </div>
  );
};
