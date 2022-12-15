import React from 'react';
import { Trash } from '../assets/svg/Trash';
export const ClearProject = ({ index, projectNameList, setProjectNamesList }) => {
  const CLEAN_MESSAGE = 'Do you want to delete task?';
  const projectNLCopy = [...projectNameList];
  const onClickClear = () => {
    if (window.confirm(CLEAN_MESSAGE)) {
      projectNLCopy.splice(index, 1);
      if (setProjectNamesList) {
        setProjectNamesList(projectNLCopy);
        localStorage.setItem('projectList', JSON.stringify(projectNLCopy));
      }
    }
  };
  return (
    <div className="project-table__trash" onClick={onClickClear}>
      <Trash />
    </div>
  );
};
