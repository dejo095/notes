import React from 'react'
import useStore from '../store';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function DatePicker() {

  const deadline = useStore(state => state.deadline);
  const setDeadline = useStore(state => state.setDeadline);
  const classes = useStyles();

  const handleDateChange = (e) => {
    if(e.target.value != null) {
      setDeadline(e.target.value);
    }
  }

  return (
    <div>
      <form className={classes.container} noValidate>
        <TextField
          id="deadline"
          label="Add Deadline"
          type="datetime-local"
          value={deadline}
          onChange={handleDateChange}
          className={classes.textField}
          InputLabelProps={{
          shrink: true,
          }}
        />
      </form>
    </div>
  )
}

export default DatePicker

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginRight: 10,
    width: 200,
  },
}));