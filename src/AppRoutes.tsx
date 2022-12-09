import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './components/Home';
import { TaskPage } from './components/TaskPage';
import { Layout } from './Layout';
import { useColumns } from './hooks/useColumns';

export const AppRoutes = () => {
  const { setColumns } = useColumns();

  useEffect(() => {
    const items = localStorage.getItem('items');
    if (items && setColumns) {
      const parsedItems = JSON.parse(items);
      setColumns(parsedItems);
    }
    // eslint-disable-next-line
  }, []);

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
