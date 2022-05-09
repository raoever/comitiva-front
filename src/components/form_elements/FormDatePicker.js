import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import brLocale from "date-fns/locale/pt-BR";

export default function BasicDatePicker(params) {
    const [value, setValue] = React.useState(null);

    return (
        <LocalizationProvider
            locale={brLocale}
            dateAdapter={AdapterDateFns}>
            <DatePicker
                disableFuture
                label={params.label}
                openTo="year"
                views={['year', 'month', 'day']}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) =>
                    <TextField {...params}
                               variant="standard"
                               value={params.value}
                    />}
            />
        </LocalizationProvider>
    );
}
