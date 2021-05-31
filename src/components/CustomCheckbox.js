import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function CustomCheckbox() {
  return (
    <FormLabel
      value="encrypt"
      control={<GreyCheckbox size="small" />}
      label="Encrypt contents?"
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
    color: '#6C8784',
  },
  label: {
    fontSize: '12px',
    color: '#6C8784',
  },
})(props => <FormControlLabel {...props} />);
