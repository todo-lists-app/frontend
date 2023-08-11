import React, {useState, useImperativeHandle} from 'react';
import DatePicker from "react-datepicker";
import {Box} from "dracula-ui";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateTimePicker.module.css";

interface DatePickerProps {
  dateTime: Date;
  name: string;
}

export const DateTimePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(({dateTime, name, ...props}, ref) => {
  let inputDate = new Date();
  if (dateTime) {
    inputDate = dateTime;
  }

  console.log("ref", ref)
  console.log("name", name)

  const [startDate, setStartDate] = useState(inputDate);
  const onDateChange = (date: Date) => {
    setStartDate(date);
  }
  useImperativeHandle(ref, () => ({
    value: startDate.toISOString()
  } as any));

  return (
    <Box className={styles.datePicker}>
      <DatePicker className={styles.reactDatepicker}
        selected={startDate}
        onChange={onDateChange}
        dropdownMode={"select"}
        showTimeSelect={true}
        dateFormat="MMMM d, yyyy h:mm aa"
        {...props} />
    </Box>
  );
})
