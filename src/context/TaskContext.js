import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    const apiUrl = 'http://localhost:8000/api/v1/task';

    const getAuthToken = () => {
        return sessionStorage.getItem('authToken');
    };

    const fetchTasks = async () => {
        try {
            const token = getAuthToken();
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("data",response.data.data);
            setTasks(response.data.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const createTask = async (task) => {
        try {
            const token = sessionStorage.getItem('authToken');
            if (!token) {
                console.error('No authentication token found');
                return;
            }
            const response = await axios.post(apiUrl, task, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log("data",response.data.data)
            setTasks((prevTasks) => [...prevTasks, response.data.data]);
            return { success: true };
        } catch (error) {
            console.error('Error creating task:', error.response?.data || error.message);
        }
    };

    const updateTask = async (taskId, updatedTask) => {
        try {
            const token = getAuthToken();
            const response = await axios.put(`${apiUrl}/${taskId}`, updatedTask, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === taskId ? response.data.data : task))
            );
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const token = getAuthToken();
            await axios.delete(`${apiUrl}/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const getTaskById = async (taskId) => {
        try {
            const token = getAuthToken();
            const response = await axios.get(`${apiUrl}/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching task by ID:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask, getTaskById, selectedTask }}>
            {children}
        </TaskContext.Provider>
    );
}

export const useTaskContext = () => useContext(TaskContext);
