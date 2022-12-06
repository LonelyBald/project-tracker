import React, { useState } from 'react';

export const ModalEdit = ({ active, setActive }) => {
  return (
    <div className={active ? 'modalEdit active' : 'modalEdit'} onClick={() => setActive(false)}>
      <div
        className={active ? 'modalEdit__content active' : 'modalEdit__content'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="number">1</div>
        <input className="modalEdit__content__title" type="text" placeholder="Edit title..." />
        <button className="modalEdit__content__subtask">Add subtask</button>
        <div>Description</div>
        <input
          className="modalEdit__content__description"
          type="text"
          placeholder="Edit description..."
        />
        <div>Comments</div>
        <input
          className="modalEdit__content__comments"
          type="text"
          placeholder="Edit comments..."
        />
        <button className="modalEdit__content__button">Edit task</button>
      </div>
    </div>
  );
};
