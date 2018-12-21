import React from 'react';
import Select from '@material/react-select';
import '@material/react-select/dist/select.css';

const Dropdown = ({ name, value, label, handler, options }) => (
  <Select
    className="dropdown input"
    name={name}
    value={value}
    outlined
    label={label}
    onChange={handler}
    options={options}
  />
);

export default Dropdown;
