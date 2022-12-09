import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ITask } from './TaskPage';
import { useColumns } from '../hooks/useColumns';

interface ModalCreatorProps {
  active: boolean;
  setActive: (open: boolean) => void;
}

export const ModalCreator = ({ active, setActive }: ModalCreatorProps) => {
  const [titleInputValue, setTitleInputValue] = useState('');
  const [descInputValue, setDescInputValue] = useState('');
  const [commentsInputValue, setCommentsInputValue] = useState('');
  const [priorityInputValue, setPriorityInputValue] = useState('');
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

  const onChangePriorityInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPriorityInputValue(event.target.value);
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
      comments: commentsInputValue,
      priority: priorityInputValue,
    } as ITask);

    if (setColumns) {
      setColumns(columnsCopy);
    }

    setTitleInputValue('');
    setCommentsInputValue('');
    setDescInputValue('');
  };

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('items', JSON.stringify(columns));
    }
    isMounted.current = true;
  }, [columns]);

  // useEffect(() => {
  //   const items = localStorage.getItem('items');
  //   if (items && setColumns) {
  //     const parsedItems = JSON.parse(items);
  //     setColumns(parsedItems);
  //   }
  // }, [setColumns]);

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
        <div>Priority</div>
        <input
          className="modalCreator__content__comments"
          type="text"
          placeholder="Add comments..."
          value={priorityInputValue}
          onChange={onChangePriorityInput}
        />
        <button className="modalCreator__content__button" onClick={handleAddTask}>
          Add task
        </button>
      </div>
    </div>
  );
};
