import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormInputText(params) {
    return (
        <TextField
            id={params.id}
            name={params.name}
            value={params.value}
            label={params.label}
            variant={params.variant}
            onChange={params.onChange}
        />
    )
}