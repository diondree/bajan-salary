import React from 'react';
import TextField, { Input } from '@material/react-text-field';
import '@material/react-text-field/dist/text-field.css';

const InputField = ({ label, name, value, handler, icon }) => (
  <div>
    <TextField label={label} outlined leadingIcon={icon} className="input">
      <Input name={name} value={value} onChange={handler} maxLength="15" />
    </TextField>
  </div>
);

export default InputField;
