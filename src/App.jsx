import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import getModal from './modals/modals.js';
import { Card } from 'react-bootstrap';
import './App.css';

function App() {
  const [status, setStatus] = useState('default');
  const [tasks, updateTasks] = useImmer({
    list: [],
    rename: '',
    target: null,
  });

  const handleAdd = () => {
    setStatus('adding');
  };

  const handleRename = (id) => {
    setStatus('renaming');
    const { list } = tasks;
    updateTasks((draft) => {
      draft.target = id;
      draft.rename = list[id];
    });
  };

  const handleRemove = (id) => {
    setStatus('removing');
    updateTasks((draft) => {
      draft.target = id;
    });
  };

  const handleSubmitAdd = (task) => {
    const { list } = tasks;
    const newList = [task, ...list];
    updateTasks((draft) => {
      draft.list = newList;
    });
    setStatus('default');
  };

  const handleSubmitRename = (task) => {
    const { list, target } = tasks;
    const newList = list.map((item, index) => {
      if (index === target) {
        return task;
      }
      return item;
    });
    updateTasks((draft) => {
      draft.list = newList;
    });
    setStatus('default');
  };

  const handleSubmitRemove = (e) => {
    e.preventDefault();
    const { list, target } = tasks;
    const newList = list.filter((task, index) => index !== target);
    updateTasks((draft) => {
      draft.list = newList;
    });
    setStatus('default');
  };

  const handleClose = () => {
    updateTasks((draft) => {
      draft.add = '';
    });
    setStatus('default');
  };

  const renderTasks = () => {
    if (tasks.list.length === 0) {
      return null;
    }
    return (
      tasks.list.map((task, index) => (
        <Card key={Math.random()}>
          <Card.Body>
            <Card.Text>{task}</Card.Text>
            <button
              type="button"
              className="btn btn-primary"
              data-testid="item-rename"
              onClick={() => handleRename(index)}
            >
              Rename
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-testid="item-remove"
              onClick={() => handleRemove(index)}
            >
              Remove
            </button>
          </Card.Body>
        </Card>
      ))
    );
  };

  const renderModal = () => {
    if (status === 'default') {
      return null;
    }
    const Component = getModal(status);
    switch (status) {
      case 'adding':
        return (
          <Component
            onSubmit={handleSubmitAdd}
            onClose={handleClose}
          />
        );
      case 'renaming':
        return (
          <Component
            value={tasks.rename}
            onSubmit={handleSubmitRename}
            onClose={handleClose}
          />
        );
      case 'removing':
        return (
          <Component
            onSubmit={handleSubmitRemove}
            onClose={handleClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mb-3">
        <button
          type="button"
          data-testid="item-add"
          className="btn btn-secondary"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
      {renderTasks()}
      {renderModal()}
    </>
  );
}

export default App;