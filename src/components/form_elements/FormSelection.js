import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectVariants(params) {
    const [estuda, setEstuda] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setEstuda(event.target.value);
    };

    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="select-standard-label">Estuda?</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={estuda}
                    onChange={handleChange}
                    label="Age"
                >
                    <MenuItem value="" onChange={params.onChange}>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={true}>Sim</MenuItem>
                    <MenuItem value={false}>Não</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
