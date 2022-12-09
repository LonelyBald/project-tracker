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
  const onChangeTitleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleInputValue(event.target.value);
  };
  const onChangeDescInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDescInputValue(event.target.value);
  };

  const onChangeCommentsInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentsInputValue(event.target.value);
  };

  const handleEditTask = () => {
    changeTask({
      title: titleInputValue,
      desc: descInputValue,
      comments: commentsInputValue,
    });
  };

  return (
    <div className={active ? 'modalEdit active' : 'modalEdit'} onClick={() => setActive(false)}>
      <div
        className={active ? 'modalEdit__content active' : 'modalEdit__content'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="number">1</div>
        <input
          className="modalEdit__content__title"
          type="text"
          placeholder="Edit title..."
          value={titleInputValue}
          onChange={onChangeTitleInput}
        />
        <div>Description</div>
        <input
          className="modalEdit__content__description"
          type="text"
          placeholder="Edit description..."
          value={descInputValue}
          onChange={onChangeDescInput}
        />
        <div>Comments</div>
        <input
          className="modalEdit__content__comments"
          type="text"
          placeholder="Edit comments..."
          value={commentsInputValue}
          onChange={onChangeCommentsInput}
        />
        <button className="modalEdit__content__button" onClick={handleEditTask}>
          Edit task
        </button>
      </div>
    </div>
  );
};
