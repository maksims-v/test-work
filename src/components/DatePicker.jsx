import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickerValue({
  changeMinDate,
  changeMaxDate,
  fromDate,
  toDate,
  minDate,
  maxDate,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="От"
        minDate={minDate && minDate}
        maxDate={maxDate && maxDate}
        value={fromDate}
        onChange={(newValue) => changeMinDate(newValue)}
      />
      <DatePicker
        sx={{ pl: '10px' }}
        minDate={minDate && minDate}
        maxDate={maxDate && maxDate}
        label="До"
        value={toDate}
        onChange={(newValue) => changeMaxDate(newValue)}
      />
    </LocalizationProvider>
  );
}
