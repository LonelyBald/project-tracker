import React from 'react';
import { AppRoutes } from './AppRoutes';
import { ColumnContextProvider } from './context/ColumnContext';
import './scss/index.scss';

function App() {
  return (
    <div className="App">
      <ColumnContextProvider>
        <AppRoutes />
      </ColumnContextProvider>
    </div>
  );
}

export default App;
