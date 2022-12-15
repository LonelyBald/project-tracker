import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useColumns } from '../hooks/useColumns';
import { ModalCreateProject } from './ModalCreatProject';
import { Trash } from '../assets/svg/Trash';

export const Home = () => {
  const { setCurrentProjectName } = useColumns();
  const [modalCreatProjectActive, setModalCreatProjectActive] = useState(false);
  const getProjectNameLS = () => {
    const projects = localStorage.getItem('projectList');
    if (projects) {
      return JSON.parse(projects);
    }
    return null;
  };

  const [projectNamesList, setProjectNamesList] = useState<Array<string> | null>(
    getProjectNameLS()
  );

  return (
    <div>
      <button
        className="home_create_button"
        onClick={() => {
          setModalCreatProjectActive(true);
        }}
      >
        Create new project +
      </button>
      {projectNamesList?.map((name) => {
        return (
          <Link to="/tasks" key={name}>
            <div className="project-table">
              <div
                className="project-table__name"
                onClick={() => {
                  localStorage.setItem('currentProjectName', name);
                  setCurrentProjectName(name);
                }}
              >
                {name}
              </div>
              <div className="project-table__trash">
                <Trash />
              </div>
            </div>
          </Link>
        );
      })}
      <ModalCreateProject
        active={modalCreatProjectActive}
        setActive={setModalCreatProjectActive}
        setProjectNamesList={setProjectNamesList}
      />
    </div>
  );
};
