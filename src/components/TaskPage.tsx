import React, { DragEvent, useState } from 'react';
import '../scss/modal.scss';
import '../scss/tasks.scss';
import { ModalCreator } from './ModalCreator';
import { useColumns } from '../hooks/useColumns';
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
export type ChangeTaskArgType = { [T: string]: number | string };

export const TaskPage = () => {
  const { columns, setColumns } = useColumns();
  const [currentBoard, setCurrentBoard] = useState<IColumn | null>(null);
  const [currentItem, setCurrentItem] = useState<ITask | null>(null);
  const [modalEditActive, setModalEditActive] = useState(false);
  const [modalCreatorActive, setModalCreatorActive] = useState(false);

  const [currentColumnIndex, setCurrentColumnIndex] = useState(0);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  const changeTask = (changedTask: ChangeTaskArgType) => {
    const columnsCopy = [...columns];
    const tasksCopy = [...columnsCopy[currentTaskIndex].tasks];

    tasksCopy[currentTaskIndex] = { ...tasksCopy[currentTaskIndex], ...changedTask };

    columnsCopy[currentColumnIndex] = {
      ...columnsCopy[currentColumnIndex],
      tasks: tasksCopy,
    };

    if (setColumns) {
      setColumns(columnsCopy);
    }
  };

  const changeIndexes = (taskIndex: number, columnIndex: number) => {
    setCurrentColumnIndex(columnIndex);
    setCurrentTaskIndex(taskIndex);
  };

  const dragStartHandler = (e: DragEvent<HTMLDivElement>, board: IColumn, item: ITask) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dropCardHandler = (e: DragEvent<HTMLDivElement>, board: IColumn) => {
    if (currentBoard && setColumns && currentItem) {
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
    }
  };

  return (
    <div className="wrapper">
      {columns.map((column, indexColumn) => (
        <div
          key={column.id}
          onDrop={(e) => dropCardHandler(e, column)}
          onDragOver={(e) => e.preventDefault()}
          className="board"
        >
          <div className="title">
            {column.title}
            {column.title === 'Queue' && (
              <button className="title__button" onClick={() => setModalCreatorActive(true)}>
                +
              </button>
            )}
          </div>
          {column.tasks.map((task, indexTask) => (
            <div
              key={indexTask + column.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => e.preventDefault()}
              onDragStart={(e) => dragStartHandler(e, column, task)}
              draggable="true"
              className="item"
            >
              <h1>{task.title}</h1>
              <p>{task.desc}</p>
              <p>Comments: {task.comments}</p>
              <p>{task.time}</p>
              <p>{task.date}</p>
              <p>{task.priority}</p>
              <button
                className="item__edit__button"
                onClick={() => {
                  setModalEditActive(true);
                  changeIndexes(indexTask, indexColumn);
                }}
              >
                Edit
              </button>
              <Clear task={task} column={column} />
            </div>
          ))}
        </div>
      ))}
      <ModalCreator active={modalCreatorActive} setActive={setModalCreatorActive} />
      <ModalEdit active={modalEditActive} setActive={setModalEditActive} changeTask={changeTask} />
    </div>
  );
};
