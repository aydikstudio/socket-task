import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, IconButton, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { format } from 'date-fns';

function TaskTable({ tasks, updateTask, deleteTask }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('dueDate');
  const [open, setOpen] = useState(false); 
  const [currentTask, setCurrentTask] = useState(null); 

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (orderBy === 'dueDate') {
      return (new Date(a.dueDate) - new Date(b.dueDate)) * (order === 'asc' ? 1 : -1);
    }
    return 0;
  });

  const handleCheckboxChange = (task) => {
    updateTask({ ...task, isCompleted: !task.isCompleted });
  };

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTask(null);
  };

  const handleUpdateTask = () => {
    updateTask(currentTask);
    handleClose();
  };

  return (
    <>
      <TableContainer className="my-4">
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Статус</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'dueDate'}
                  direction={orderBy === 'dueDate' ? order : 'asc'}
                  onClick={(e) => handleRequestSort(e, 'dueDate')}
                >
                  Срок выполнения
                </TableSortLabel>
              </TableCell>
              
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTasks.map((task) => (
              <TableRow key={task.title}>
                                <TableCell>
                  <Checkbox
                    checked={task.isCompleted}
                    onChange={() => handleCheckboxChange(task)}
                  />
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{format(new Date(task.dueDate), 'dd/MM/yyyy')}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(task)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deleteTask(task.title)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Модальное окно для редактирования */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Редактировать задачу</DialogTitle>
        <DialogContent>
          {currentTask && (
            <>
              <TextField
                label="Название"
                name="title"
                value={currentTask.title}
                onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                fullWidth
                className="mb-2"
              />
              <TextField
                label="Описание"
                name="description"
                value={currentTask.description}
                onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                fullWidth
                className="mb-2"
              />
              <TextField
                label="Срок выполнения"
                type="date"
                name="dueDate"
                value={currentTask.dueDate}
                onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })}
                fullWidth
                InputLabelProps={{ shrink: true }}
                className="mb-2"
              />
              <Checkbox
                checked={currentTask.isCompleted}
                onChange={(e) => setCurrentTask({ ...currentTask, isCompleted: e.target.checked })}
              />
              <span>Задача выполнена</span>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleUpdateTask} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TaskTable;
