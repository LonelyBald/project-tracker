import React, { ChangeEvent, useState } from 'react';

import { ChangeTaskArgType } from './TaskPage';

interface ModalEditProps {
  active: boolean;
  setActive: (open: boolean) => void;
  changeTask: (object: ChangeTaskArgType) => void;
}

export const ModalEdit = ({ active, setActive, changeTask }: ModalEditProps) => {
  const [titleInputValue, setTitleInputValue] = useState('');
  const [descInputValue, setDescInputValue] = useState('');
  const [commentsInputValue, setCommentsInputValue] = useState('');
  const [priorityInputValue, setPriorityInputValue] = useState('');
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

  const handleEditTask = () => {
    const time = new Date().toLocaleTimeString('en-GB');
    const date = new Date().toLocaleDateString('en-GB');
    changeTask({
      title: titleInputValue,
      desc: descInputValue,
      time: time,
      date: date,
      comments: commentsInputValue,
    });

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
          className="modal__content__title"
          type="text"
          placeholder="Edit title..."
          value={titleInputValue}
          onChange={onChangeTitleInput}
        />
        <div>Description</div>
        <input
          className="modal__content__description"
          type="text"
          placeholder="Edit description..."
          value={descInputValue}
          onChange={onChangeDescInput}
        />
        <div>Comments</div>
        <input
          className="modal__content__comments"
          type="text"
          placeholder="Edit comments..."
          value={commentsInputValue}
          onChange={onChangeCommentsInput}
        />
        <div>Priority</div>
        <input
          className="modal__content__priority"
          type="text"
          placeholder="Edit priority..."
          value={priorityInputValue}
          onChange={onChangePriorityInput}
        />
        <button className="modal__content__button" onClick={handleEditTask}>
          Edit task
        </button>
      </div>
    </div>
  );
};
