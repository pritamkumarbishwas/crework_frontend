import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Box, Button } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialData = {
    tasks: {
        'task-1': { id: 'task-1', title: 'Implement User Authentication', description: 'Develop and integrate user authentication using email and password.', status: 'To do', priority: 'Urgent', deadline: '2024-08-15', time: '1 hr ago' },
        'task-2': { id: 'task-2', title: 'Design Home Page UI', description: 'Develop and integrate user authentication using email and password.', status: 'In progress', priority: 'Medium', deadline: '2024-08-15', time: '1 hr ago' },
        'task-3': { id: 'task-3', title: 'Conduct User Feedback Survey', description: 'Collect and analyze user feedback to improve app features.', status: 'In progress', priority: 'Low', deadline: '2024-08-05', time: '3 hr ago' },
        'task-4': { id: 'task-4', title: 'Integrate Cloud Storage', description: 'Enable cloud storage for note backup and synchronization.', status: 'Under review', priority: 'Urgent', deadline: '2024-08-20', time: '2 days ago' },
        'task-5': { id: 'task-5', title: 'Test Cross-browser Compatibility', description: 'Ensure the app works seamlessly across different web browsers.', status: 'Finished', priority: 'Medium', deadline: '2024-07-30', time: '4 days ago' },
    },
    columns: {
        'column-1': { id: 'column-1', title: 'To do', taskIds: ['task-1'] },
        'column-2': { id: 'column-2', title: 'In progress', taskIds: ['task-2', 'task-3'] },
        'column-3': { id: 'column-3', title: 'Under review', taskIds: ['task-4'] },
        'column-4': { id: 'column-4', title: 'Finished', taskIds: ['task-5'] },
    },
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

const Board = () => {
    const [state, setState] = useState(initialData);

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = state.columns[source.droppableId];
        const finish = state.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            setState(newState);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        setState(newState);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    {state.columnOrder.map(columnId => {
                        const column = state.columns[columnId];
                        const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

                        return (
                            <Column key={column.id} column={column} tasks={tasks} />
                        );
                    })}
                </Grid>
            </Container>
        </DragDropContext>
    );
};

const Column = ({ column, tasks }) => {
    return (
        <Grid item xs={12} sm={6} md={3} sx={{backgroundColor:'#fff'}}>
            <Paper sx={{ padding: 2}}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    {column.title}
                </Typography>
                <Droppable droppableId={column.id}>
                    {provided => (
                        <Box
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            sx={{ minHeight: 500, backgroundColor: '#F9F9F9', padding: 1, borderRadius: 2 }}
                        >
                            {tasks.map((task, index) => (
                                <Task key={task.id} task={task} index={index} />
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
    return (
        <Draggable draggableId={task.id} index={index}>
            {provided => (
                <Paper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{ padding: 2, marginBottom: 2, borderRadius: 2, boxShadow: 2 }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {task.title}
                    </Typography>
                    <Typography variant="body2">{task.description}</Typography>
                    <Typography variant="caption" sx={{ display: 'block', marginTop: 1 }}>
                        {task.priority}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', marginTop: 1 }}>
                        {task.deadline}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', marginTop: 1 }}>
                        {task.time}
                    </Typography>
                </Paper>
            )}
        </Draggable>
    );
};

export default Board;
