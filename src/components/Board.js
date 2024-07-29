import React, { useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Button, Chip } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTaskContext } from '../context/TaskContext'; // Adjust the path as necessary
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { formatDistanceToNow, parseISO } from 'date-fns';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SortIcon from '@mui/icons-material/Sort'; // Import the sort icon

const Board = () => {
    const { tasks, createTask, updateTask, deleteTask } = useTaskContext();

    // Define initial columns state
    const [columns, setColumns] = React.useState({
        'column-1': { id: 'column-1', title: 'To do', taskIds: [] },
        'column-2': { id: 'column-2', title: 'In progress', taskIds: [] },
        'column-3': { id: 'column-3', title: 'Under review', taskIds: [] },
        'column-4': { id: 'column-4', title: 'Finished', taskIds: [] },
    });

    const columnOrder = ['column-1', 'column-2', 'column-3', 'column-4'];

    useEffect(() => {
        // Map tasks to columns
        const newColumns = { ...columns };
        tasks.forEach(task => {
            const columnId = getColumnIdByStatus(task.status);
            if (columnId && newColumns[columnId]) {
                if (!newColumns[columnId].taskIds.includes(task._id)) {
                    newColumns[columnId].taskIds.push(task._id);
                }
            }
        });
        setColumns(newColumns);
    }, [tasks]);

    const getColumnIdByStatus = (status) => {
        switch (status) {
            case 'To Do':
                return 'column-1';
            case 'In Progress':
                return 'column-2';
            case 'Under review':
                return 'column-3';
            case 'Finished':
                return 'column-4';
            default:
                return null;
        }
    };

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const start = columns[source.droppableId];
        const finish = columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = { ...start, taskIds: newTaskIds };
            setColumns((prev) => ({ ...prev, [newColumn.id]: newColumn }));
        } else {
            const startTaskIds = Array.from(start.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStart = { ...start, taskIds: startTaskIds };

            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newFinish = { ...finish, taskIds: finishTaskIds };

            setColumns((prev) => ({ ...prev, [newStart.id]: newStart, [newFinish.id]: newFinish }));

            // Update task status in backend (optional)
            const task = tasks.find(t => t._id === draggableId);
            if (task) {
                await updateTask(draggableId, { ...task, status: finish.title });
            }
        }
    };

    return (
        <DragDropContext >
            <Container sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    {columnOrder.map(columnId => {
                        const column = columns[columnId];
                        const columnTasks = column.taskIds.map(taskId => tasks.find(task => task._id === taskId));

                        return (
                            <Column key={column.id} column={column} tasks={columnTasks} />
                        );
                    })}
                </Grid>
            </Container>
        </DragDropContext>
    );
};

const Column = ({ column, tasks }) => {
    return (
        <Grid item xs={12} sm={6} md={3} sx={{ backgroundColor: '#fff', boxShadow: 'none' }}>
            <Paper sx={{ padding: 1, boxShadow: 'none' }}>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', marginBottom: 2 }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>{column.title}</span>
                        <SortIcon sx={{ color: 'primary.main' }} />
                    </Box>
                </Typography>
                <Droppable droppableId={column.id}>
                    {provided => (
                        <Box
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            sx={{ minHeight: 500, borderRadius: 2 }}
                        >
                            {tasks.map((task, index) => (
                                <Task key={task._id} task={task} index={index} />
                            ))}
                            {provided.placeholder}
                            <Button variant="outlined" fullWidth sx={{ mt: 1 }}>
                                Add new
                            </Button>
                        </Box>
                    )}
                </Droppable>
            </Paper>
        </Grid>
    );
};

const Task = ({ task, index }) => {
    if (!task._id) {
        console.error("Task is missing an id:", task);
        return null;
    }

    const timeAgo = (dateStr) => {
        try {
            const date = parseISO(dateStr);
            return formatDistanceToNow(date, { addSuffix: true });
        } catch (error) {
            console.error("Time ago formatting error:", error);
            return 'Unknown time';
        }
    };

    const priorityColors = {
        Urgent: 'error',
        Medium: 'warning',
        Low: 'success',
    };
    const priorityColor = priorityColors[task.priority] || 'default';

    return (
        <Draggable  index={index} sx={{ boxShadow: 'none' }}>
            {provided => (
                <Paper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{ padding: 2, marginBottom: 2, borderRadius: 2, backgroundColor: '#F9F9F9' }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {task.title}
                    </Typography>
                    {/* <Typography variant="body2">{task.description}</Typography> */}
                    {/* <Typography variant="caption" sx={{ display: 'block', marginTop: 1, fontWeight: 'bold' }}>
                        {task.priority}
                    </Typography> */}
                    <Chip
                        label={task.priority}
                        color={priorityColor}
                        sx={{ fontWeight: 'bold', marginRight: 1 }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                        <AccessTimeIcon sx={{ marginRight: 0.5 }} /> {/* Clock icon */}
                        <Typography variant="caption">
                            {task.deadline}
                        </Typography>
                    </Box>

                    <Typography variant="caption" sx={{ display: 'block', marginTop: 1 }}>
                        {timeAgo(task.createdAt)}
                    </Typography>
                </Paper>
            )}
        </Draggable>
    );
};

export default Board;
