import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function DatePicker() {

  const classes = useStyles();

  const handleDateChange = (e) => {
    console.log(e.target.value);
  }

  return (
    <div>
      <form className={classes.container} noValidate>
        <TextField
          id="deadline"
          label="Add Deadline"
          type="datetime-local"
          // defaultValue="2017-05-24T10:30"
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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));