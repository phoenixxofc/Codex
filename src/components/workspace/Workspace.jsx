import React from 'react';
import { InputPane } from './InputPane.jsx';
import { OutputPane } from './OutputPane.jsx';

export const Workspace = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 my-4">
      <InputPane />
      <OutputPane />
    </div>
  );
};
