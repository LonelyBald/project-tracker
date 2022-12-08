import React, { ChangeEvent, useState } from 'react';
import '../scss/modalEdit.scss';
import '../scss/modalCreator.scss';
import '../scss/tasks.scss';
import { ModalCreator } from './ModalCreator';
import { useColumns } from '../hooks/useColumns';
import { Priority } from './Priority';
import { ModalEdit } from './ModalEdit';
import { Clear } from './Clear';

export interface IColumn {
  id: number;
  title: string;
  tasks: Array<ITask>;
}

export interface ITask {
  id: number;
  title: string;
  desc: string;
  time: string;
  priority: string;
  comments: string;
  date: string;
}

export const TaskPage = () => {
  const { columns, setColumns } = useColumns();
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [modalEditActive, setModalEditActive] = useState(false);
  const [modalCreatorActive, setModalCreatorActive] = useState(false);
  const dragOverHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.className == 'item') {
      e.target.style.boxShadow = '0 4px 3px gray';
    }
  };

  const dragLeaveHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.style.boxShadow = 'none';
  };

  const dragStartHandler = (e: ChangeEvent<HTMLInputElement>, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragEndHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.style.boxShadow = 'none';
  };

  const dropHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.target.style.boxShadow = 'none';
  };

  const dropCardHandler = (e: ChangeEvent<HTMLInputElement>, board) => {
    board.tasks.push(currentItem);
    const currentIndex = currentBoard.tasks.indexOf(currentItem);
    currentBoard.tasks.splice(currentIndex, 1);
    setColumns(() => {
      return columns.map((column) => {
        if (column.id === board.id) {
          return board;
        }
        if (column.id === currentBoard.id) {
          return currentBoard;
        }
        return column;
      });
    });
  };

  return (
    <div className="wrapper">
      {columns.map((column, index) => (
        <div
          onDrop={(e) => dropCardHandler(e, column)}
          onDragOver={(e) => dragOverHandler(e)}
          className="board"
        >
          <div className="title">
            {column.title}
            {column.title === 'Queue' && (
              <>
                <button className="title__button" onClick={() => setModalCreatorActive(true)}>
                  +
                </button>
                <ModalCreator
                  active={modalCreatorActive}
                  setActive={setModalCreatorActive}
                  column={column}
                ></ModalCreator>
              </>
            )}
          </div>
          {column.tasks.map((task, index) => (
            <div
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragStart={(e) => dragStartHandler(e, column, task)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              draggable="true"
              className="item"
            >
              <h1>{task.title}</h1>
              <p>{task.desc}</p>
              <p>Comments: {task.comments}</p>
              <p>{task.time}</p>
              <p>{task.date}</p>
              <button className="edit__button" onClick={() => setModalEditActive(true)}>
                Edit
              </button>
              <Priority priorityDefault={task.priority} task={task} column={column} />
              <Clear task={task} column={column} />
              <ModalEdit
                active={modalEditActive}
                setActive={setModalEditActive}
                task={task}
                column={column}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
