import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { IColumn, ITask } from './TaskPage';
import { useColumns } from '../hooks/useColumns';

export interface ActiveType {
  active: boolean;
  setActive: (open: boolean) => void;
  column: IColumn;
  columnIndex: number;
}

export const ModalCreator = ({ active, setActive }: ActiveType) => {
  const [titleInputValue, setTitleInputValue] = useState('');
  const [descInputValue, setDescInputValue] = useState('');
  const [commentsInputValue, setCommentsInputValue] = useState('');
  const { columns, setColumns } = useColumns();
  const isMounted = useRef(false);
  const onChangeTitleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleInputValue(event.target.value);
  };
  const onChangeDescInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDescInputValue(event.target.value);
  };

  const onChangeCommentsInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentsInputValue(event.target.value);
  };

  const handleAddTask = () => {
    const columnsCopy = [...columns];
    const time = new Date().toLocaleTimeString('en-GB');
    const date = new Date().toLocaleDateString('en-GB');
    columnsCopy[0].tasks.push({
      title: titleInputValue,
      desc: descInputValue,
      time: time,
      date: date,
      priority: 'Highest',
    } as ITask);

    if (setColumns) {
      setColumns(columnsCopy);
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('items', JSON.stringify(columns));
    }
    isMounted.current = true;
  }, [columns]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      setColumns(items);
    }
  }, [setColumns]);

  return (
    <div
      className={active ? 'modalCreator active' : 'modalCreator'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'modalCreator__content active' : 'modalCreator__content'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="number">1</div>
        <input
          value={titleInputValue}
          onChange={onChangeTitleInput}
          className="modalCreator__content__title"
          type="text"
          placeholder="Add title..."
        />
        <button className="modalCreator__content__subtask">Add subtask</button>
        <div>Description</div>
        <input
          className="modalCreator__content__description"
          type="text"
          placeholder="Add description..."
          value={descInputValue}
          onChange={onChangeDescInput}
        />
        <div>Comments</div>
        <input
          className="modalCreator__content__comments"
          type="text"
          placeholder="Add comments..."
          value={commentsInputValue}
          onChange={onChangeCommentsInput}
        />
        <button className="modalCreator__content__button" onClick={handleAddTask}>
          Add task
        </button>
      </div>
    </div>
  );
};
