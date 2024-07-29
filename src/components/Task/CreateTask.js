import React, { useState } from 'react';
import { Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';

const CreateTask = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    const handleDeadlineChange = (event) => {
        setDeadline(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = () => {
        // Handle form submission logic
        onClose();  // Close the modal when the form is submitted
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
            <TextField
                margin="normal"
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="name"
                autoFocus
                value={title}
                onChange={handleTitleChange}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                    labelId="status-label"
                    value={status}
                    onChange={handleStatusChange}
                >
                    <MenuItem value="Not started">Not started</MenuItem>
                    <MenuItem value="In progress">In progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                    labelId="priority-label"
                    value={priority}
                    onChange={handlePriorityChange}
                >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                </Select>
            </FormControl>
            <TextField
                fullWidth
                margin="normal"
                id="deadline"
                label="Deadline"
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
                value={deadline}
                onChange={handleDeadlineChange}
            />
            <TextField
                fullWidth
                margin="normal"
                id="description"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </Box>
        </Box>
    );
};

export default CreateTask;
