import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function CustomCheckbox() {
  return (
    <FormLabel
      value="encrypt"
      control={<GreyCheckbox color="primary" />}
      label="Encrypt message?"
      labelPlacement="start"
    />
  );
}

export default CustomCheckbox;

const GreyCheckbox = withStyles({
  root: {
    color: '#6C8784',
    '&$checked': {
      color: '#6C8784',
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

const FormLabel = withStyles({
  root: {
    width: '140px',
    color: '#6C8784',
    fontSize: '8px',
  },
})(props => <FormControlLabel {...props} />);
