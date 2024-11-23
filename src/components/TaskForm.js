import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function TaskForm({ addTask }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    isCompleted: false,
    dueDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask({ title: '', description: '', isCompleted: false, dueDate: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <TextField
        label="Название"
        name="title"
        value={task.title}
        onChange={handleChange}
        fullWidth
        required
        className="mb-2"
      />
      <TextField
        label="Описание"
        name="description"
        value={task.description}
        onChange={handleChange}
        fullWidth
        required
        className="mb-2"
      />
      <TextField
        label="Срок выполнения"
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
        className="mb-2"
      />
      <Button type="submit" variant="contained">Добавить задачу</Button>
    </form>
  );
}

export default TaskForm;