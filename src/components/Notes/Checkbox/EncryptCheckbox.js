import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './encrypt-checkbox.css';

function EncryptCheckbox() {
  return (
    <FormControlLabel
      value="encrypt"
      control={<Checkbox size="small" />}
      label="Encrypt contents?"
      labelPlacement="start"
    />
  );
}

export default EncryptCheckbox;
