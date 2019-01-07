import React from 'react';
import TextField, { Input, HelperText } from '@material/react-text-field';
import '@material/react-text-field/dist/text-field.css';

const InputField = ({ label, name, value, handler, icon, error }) => (
  <div>
    <TextField
      label={label}
      outlined
      leadingIcon={icon}
      className="input"
      helperText={<HelperText>{error}</HelperText>}
    >
      <Input name={name} value={value} onChange={handler} maxLength="15" />
    </TextField>
  </div>
);

export default InputField;
