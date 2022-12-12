import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './components/Home';
import { TaskPage } from './components/TaskPage';
import { Layout } from './Layout';
import { useColumns } from './hooks/useColumns';

export const AppRoutes = () => {
  const { setCurrentProjectName } = useColumns();

  useEffect(() => {
    const currentProjectLs = localStorage.getItem('currentProjectName');
    if (currentProjectLs) {
      setCurrentProjectName(currentProjectLs);
    }
  }, [setCurrentProjectName]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/tasks" element={<TaskPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
