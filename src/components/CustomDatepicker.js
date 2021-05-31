import React from 'react';
import useStore from '../store';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function CustomDatepicker() {
  const deadline = useStore(state => state.deadline);
  const setDeadline = useStore(state => state.setDeadline);
  const classes = useStyles();

  const handleDateChange = e => {
    if (e.target.value != null) {
      setDeadline(e.target.value);
    }
  };

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="deadline"
        label="Add Deadline"
        type="datetime-local"
        value={deadline}
        margin="dense"
        size="small"
        onChange={handleDateChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}

export default CustomDatepicker;

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flex: 1,
  },
  textField: {
    width: 180,
  },
}));
