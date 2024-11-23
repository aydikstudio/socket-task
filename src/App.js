import React, { useEffect, useState } from 'react';
import TaskTable from './components/TaskTable';
import TaskForm from './components/TaskForm';
import Filter from './components/Filter';
import { Container } from '@mui/material';
import './App.css';

import { io } from 'socket.io-client';

function App() {

  const socket = io('http://localhost:4000');
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [tasks, setTasks] = useState([

  ]);




  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setTasks(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  const [filter, setFilter] = useState('Все');

  const addTask = (task) => setTasks([...tasks, task]);

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) =>
      task.title === updatedTask.title ? updatedTask : task
    ));
  };

  const deleteTask = (taskTitle) => {
    setTasks(tasks.filter((task) => task.title !== taskTitle));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Все') return true;
    return filter === 'Выполненные' ? task.isCompleted : !task.isCompleted;
  });

  return (
    <Container>
      <h1 className="text-4xl my-4">Task Manager</h1>
      <Filter setFilter={setFilter} />
      <TaskForm addTask={addTask} />
      {isConnected && (
        <TaskTable
          tasks={filteredTasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      )}

    </Container>
  );
}

export default App;