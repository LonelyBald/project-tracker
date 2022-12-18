import React, { SetStateAction, Dispatch } from 'react';
import { Trash } from '../assets/svg/Trash';

interface ClearProjectPropsType {
  index: number;
  projectNameList: Array<string>;
  setProjectNamesList: Dispatch<SetStateAction<string[] | null>>;
}
export const ClearProject = ({
  index,
  projectNameList,
  setProjectNamesList,
}: ClearProjectPropsType) => {
  const CLEAN_MESSAGE = 'Do you want to delete project?';
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
