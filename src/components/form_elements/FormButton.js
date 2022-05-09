import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";

export default function BasicButtons(params) {
    return (
        <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined">{params.children}</Button>
        </Box>
    );
}