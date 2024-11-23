import React from 'react';
import { ButtonGroup, Button } from '@mui/material';

function Filter({ setFilter }) {
  return (
    <ButtonGroup variant="text" aria-label="text button group" className="my-4">
      <Button onClick={() => setFilter('Все')}>Все</Button>
      <Button onClick={() => setFilter('Выполненные')}>Выполненные</Button>
      <Button onClick={() => setFilter('Невыполненные')}>Невыполненные</Button>
    </ButtonGroup>
  );
}

export default Filter;