import React from 'react';
import useStore from '../../../store';
import TextField from '@material-ui/core/TextField';

function Datepicker() {
  const deadline = useStore(state => state.deadline);
  const setDeadline = useStore(state => state.setDeadline);

  const handleDateChange = e => {
    if (e.target.value != null) {
      setDeadline(e.target.value);
    }
  };

  return (
    <form noValidate>
      <TextField
        id="deadline"
        label="Add Deadline"
        type="datetime-local"
        value={deadline}
        margin="dense"
        size="small"
        onChange={handleDateChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}

export default Datepicker;
