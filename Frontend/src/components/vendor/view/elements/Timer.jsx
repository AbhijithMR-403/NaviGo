import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import ThemeProvider from '../../../admin/elements/theme';

const Timer = ({ label, onTimeChange }) => {
  const handleTimeChange = (newTime) => {
    // onTimeChange(newTime);
  };

  return (
    <ThemeProvider>
    <LocalizationProvider>
      <DemoContainer >
        <TimePicker   />
      </DemoContainer>
    </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Timer;