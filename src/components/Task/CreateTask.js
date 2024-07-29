import React, { useState } from 'react';
import { Box, TextField, MenuItem, Select, FormControl, InputLabel, Button, Alert } from '@mui/material';
import { useTaskContext } from '../../context/TaskContext';
import { useSnackbar } from '../../context/SnackbarContext';

const CreateTask = ({ onClose }) => {
    const { createTask } = useTaskContext();
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const { showSnackbar } = useSnackbar();

    const validateFields = () => {
        let fieldErrors = {};
        if (!title) fieldErrors.title = 'Title is required';
        if (!status) fieldErrors.status = 'Status is required';
        return fieldErrors;
    };

    const handleSubmit = async () => {
        const fieldErrors = validateFields();
        if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);
            return;
        }

        const task = { title, status, priority, deadline, description };

        try {
            const result = await createTask(task);


            if (result.success) {
                showSnackbar('Task Added successful!', 'success');
                // Redirect or perform other actions
                onClose();
            } else {
                showSnackbar(result.message, 'error');
                onClose();
            }
        } catch (err) {
            setErrors({ submit: 'Failed to create task' });
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
            {errors.submit && <Alert severity="error">{errors.submit}</Alert>}
            <TextField
                margin="normal"
                fullWidth
                id="title"
                label="Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
            />
            <FormControl fullWidth margin="normal" error={!!errors.status}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                    labelId="status-label"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="To Do">To Do</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                </Select>
                {errors.status && <Alert severity="error">{errors.status}</Alert>}
            </FormControl>
            <FormControl fullWidth margin="normal" error={!!errors.priority}>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                    labelId="priority-label"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Urgent">Urgent</MenuItem>
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
                onChange={(e) => setDeadline(e.target.value)}
                error={!!errors.deadline}
            />
            <TextField
                fullWidth
                margin="normal"
                id="description"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={!!errors.description}
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
