import React from 'react';
import TopAppBar from '@material/react-top-app-bar';

import '@material/react-top-app-bar/dist/top-app-bar.css';
import '@material/react-material-icon/dist/material-icon.css';

const Navbar = () => (
  <div>
    <TopAppBar title="Bajan Salary" className="top-bar" fixed />
  </div>
);

export default Navbar;
