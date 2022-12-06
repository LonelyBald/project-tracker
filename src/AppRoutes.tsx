import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './components/Home';
import { TaskPage } from './components/TaskPage';
import { Layout } from './Layout';

export const AppRoutes = () => {
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
