import React, { useState, useRef, useEffect } from 'react';
import '../scss/tasks.scss';
import { useColumns } from '../hooks/useColumns';
import { ITask } from './TaskPage';
interface PropsPriorityType {
  priorityDefault: string;
  task: object;
}

export const Priority = ({ priorityDefault, task }: PropsPriorityType) => {
  const priorityList = [
    { name: 'Highest', sortProperty: 'Highest' },
    { name: 'High', sortProperty: 'High' },
    { name: 'Medium', sortProperty: 'Medium' },
    { name: 'Lowest', sortProperty: 'Lowest' },
  ];
  const { columns, setColumns } = useColumns();
  const sortRef = useRef<HTMLDivElement | null>(null);
  const [priority, setPriority] = useState({
    name: priorityDefault,
    sortProperty: priorityList[0].sortProperty,
  });
  const [open, setOpen] = useState(false);

  const handleChangePriority = (obj) => {
    console.log(task);
    const indCol = columns.indexOf(task);
    console.log(indCol);
    const columnsCopy = [...columns];
    // const copy = JSON.parse(JSON.stringify(columns));
    // console.log(copy.name);
    console.log(obj);
    console.log(columnsCopy);
    const currentId = columns.indexOf(obj);
    console.log(columns[currentId]);
    console.log(currentId);
    columnsCopy[currentId].tasks.push({
      priority: obj.name,
    } as ITask);
    if (setColumns) {
      setColumns(columnsCopy);
    }
    setPriority(obj);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="item__priority">
      <div className="item__priority__label">
        <b>Priority:</b>
        <span onClick={() => setOpen(!open)}>{priority.name}</span>
      </div>
      {open && (
        <div className="item__priority__popup">
          <ul>
            {priorityList.map((obj) => (
              <li
                onClick={() => handleChangePriority(obj)}
                className={priority.sortProperty === obj.sortProperty ? 'active' : ''}
                key={obj.name + obj.sortProperty}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
