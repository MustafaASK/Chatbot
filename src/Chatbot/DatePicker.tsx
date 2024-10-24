import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import TelegramIcon from '@mui/icons-material/Telegram';
import { TextField } from '@mui/material';

interface DatePickerFieldProps {
    onDateSubmit: (date: Dayjs | null) => void; // Parent callback
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({ onDateSubmit }) => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [open, setOpen] = useState(false); // State to manage picker visibility

    const handleDateChange = (date: Dayjs | null) => {
        setSelectedDate(date); // Set the selected date
    };

    const handleSubmit = () => {
        // Call the parent callback function to submit the selected date
        onDateSubmit(selectedDate);
        setOpen(false); // Close the picker after submission
    };

    return (
        <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                open={open} // Control the opening of the picker
                onOpen={() => setOpen(true)} // Open the date picker
                onClose={() => setOpen(false)} // Close the date picker
                slots={{
                    textField: (params) => (
                        <TextField
                            {...params}
                            size="small"
                            fullWidth
                            sx={{
                                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                    padding: '8px 10px',
                                    height: "13px",
                                    fontSize: "13px"

                                },
                                '& .MuiInputBase-root.MuiOutlinedInput-root ': {
                                    borderRadius: '15px',
                                    backgroundColor: '#fff'
                                },
                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#E6E6E6',

                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#E6E6E6',
                                    borderWidth: '1px'

                                },

                            }}
                            InputProps={{
                                ...params.InputProps,
                                disableUnderline: true, // Optional: Disable underline
                                endAdornment: null, // Hide the end adornment (including time icon)
                            }}
                            onClick={() => setOpen(true)} // Open the date picker on field click
                        />
                    ),
                }}
            />
        </LocalizationProvider>

        <div style={{
                position: "absolute",
                right: "15px", // Adjust as needed
                top: "50%",
                transform: "translateY(-50%)", // Center the icon vertically
                cursor: 'pointer'
            }}
                onClick={handleSubmit}>
                   <TelegramIcon sx={{cursor: 'pointer', color: '#919191',marginTop:'4px'}}/>
            </div>
        </>
    );
};

export default DatePickerField;
