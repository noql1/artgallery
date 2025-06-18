
import React, { ChangeEvent } from 'react';
import { Box, InputBase, IconButton, alpha } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
    value: string;
    onChange: (v: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
    const handle = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

    return (
        <Box
            sx={{
                maxWidth: 600,
                mx: 'auto',
                my: 4,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: alpha('#fff', 0.9),
                borderRadius: 1,
                px: 2,
            }}
        >
            <InputBase
                placeholder="Поиск"
                fullWidth
                value={value}
                onChange={handle}
            />
            <IconButton disabled>
                <SearchIcon />
            </IconButton>
        </Box>
    );
};

export default SearchBar;
