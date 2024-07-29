import React from 'react';
import { Container, Box, TextField, Button, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FilterListIcon from '@mui/icons-material/FilterList';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';

const Toolbar = () => {
    return (
        <Container sx={{ mt: 2 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 16px',
                    backgroundColor: '#F9F9F9',
                }}
            >
                <TextField
                    variant="outlined"
                    placeholder="Search"
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        ),
                    }}
                    sx={{ marginRight: 2 }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button endIcon={<FilterListIcon />} variant="outlined" sx={{
                        marginRight: 2,
                        color: '#6f6e6e',
                        border: 'none',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            border: 'none',
                        },
                    }}>
                        Filter
                    </Button>
                    <Button endIcon={<ShareIcon />} variant="outlined" sx={{
                        marginRight: 2,
                        color: '#6f6e6e',
                        border: 'none',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            border: 'none',
                        },
                    }}>
                        Share
                    </Button>
                    <Button endIcon={<CalendarTodayIcon />} variant="outlined" sx={{
                        marginRight: 2,
                        color: '#6f6e6e',
                        border: 'none',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            border: 'none',
                        },
                    }}>
                        Calendar view
                    </Button>
                    <Button endIcon={<AutoAwesomeIcon />} variant="outlined" sx={{
                        marginRight: 2,
                        color: '#6f6e6e',
                        border: 'none',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            border: 'none',
                        },
                    }}>
                        Automation
                    </Button>
                    <Button variant="contained" color="primary" endIcon={<AddIcon />}>
                        Create new
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Toolbar;
