import React, { ChangeEvent, useState, SetStateAction, Dispatch } from 'react';
import { ModalCreatorProps } from './ModalCreator';

interface ModalCreateProjectProps extends ModalCreatorProps {
  setProjectNamesList: Dispatch<SetStateAction<string[] | null>>;
}

export const ModalCreateProject = ({
  active,
  setActive,
  setProjectNamesList,
}: ModalCreateProjectProps) => {
  const [titleInputValue, setTitleInputValue] = useState('');
  const onChangeTitleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleInputValue(event.target.value);
  };

  const handleAddProjectName = () => {
    const projectList = localStorage.getItem('projectList');
    if (projectList) {
      const parseProjectList = JSON.parse(projectList);
      localStorage.setItem('projectList', JSON.stringify([...parseProjectList, titleInputValue]));
      setProjectNamesList([...parseProjectList, titleInputValue]);
    } else {
      setProjectNamesList([titleInputValue]);
      localStorage.setItem('projectList', JSON.stringify([titleInputValue]));
    }
    setTitleInputValue('');
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
          placeholder="Project name..."
          value={titleInputValue}
          onChange={onChangeTitleInput}
        />
        <button className="modal__content__button" onClick={handleAddProjectName}>
          Add project
        </button>
      </div>
    </div>
  );
};
