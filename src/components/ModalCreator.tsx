import React, { ChangeEvent, useState } from 'react';
import { ITask } from './TaskPage';
import { useColumns } from '../hooks/useColumns';

export interface ModalCreatorProps {
  active: boolean;
  setActive: (open: boolean) => void;
}

export const ModalCreator = ({ active, setActive }: ModalCreatorProps) => {
  const [titleInputValue, setTitleInputValue] = useState('');
  const [descInputValue, setDescInputValue] = useState('');
  const [commentsInputValue, setCommentsInputValue] = useState('');
  const [priorityInputValue, setPriorityInputValue] = useState('');
  const { columns, setColumns, currentProjectName } = useColumns();

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
    setPriorityInputValue('');
    setTitleInputValue('');
    setCommentsInputValue('');
    setDescInputValue('');
  };

  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div
        className={active ? 'modal__content active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          value={titleInputValue}
          onChange={onChangeTitleInput}
          className="modal__content__title"
          type="text"
          placeholder="Add title..."
        />
        <div>Description</div>
        <input
          className="modal__content__description"
          type="text"
          placeholder="Add description..."
          value={descInputValue}
          onChange={onChangeDescInput}
        />
        <div>Comments</div>
        <input
          className="modal__content__comments"
          type="text"
          placeholder="Add comments..."
          value={commentsInputValue}
          onChange={onChangeCommentsInput}
        />
        <div>Priority</div>
        <input
          className="modal__content__comments"
          type="text"
          placeholder="Add priority..."
          value={priorityInputValue}
          onChange={onChangePriorityInput}
        />
        <button className="modal__content__button" onClick={handleAddTask}>
          Add task
        </button>
      </div>
    </div>
  );
};
