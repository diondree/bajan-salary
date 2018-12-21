import React from 'react';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import '@material/react-top-app-bar/dist/top-app-bar.css';

const Content = ({ children }) => (
    <div className="content">
      <TopAppBarFixedAdjust>{children}</TopAppBarFixedAdjust>
    </div>
  );

export default Content;
