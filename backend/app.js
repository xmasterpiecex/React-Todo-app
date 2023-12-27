const express = require('express');
const app = express();
const { readFile, writeFile } = require('fs').promises;
const crypto = require('crypto');

app.use(express.json());

app.get('/api/boards', async (req, res) => {
  try {
    const fileContent = await readFile('./db/db.txt', 'utf-8');
    const data = JSON.parse(fileContent);
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
  }
});

app.post('/api/boards/1/tasks', async (req, res) => {
  const newTask = {
    id: crypto.randomInt(9999999999999),
    title: req.body.title,
    descr: req.body.descr,
    priority: req.body.priority,
  };

  try {
    const fileContent = await readFile('./db/db.txt', 'utf-8');
    const data = JSON.parse(fileContent);
    data[0].tasks.push(newTask);
    const newData = JSON.stringify(data);

    await writeFile('./db/db.txt', newData);
    res.status(201).json(data);
  } catch (e) {
    console.log(e);
  }
});

app.delete('/api/boards/:idBoard/tasks/:idTask', async (req, res) => {
  try {
    const fileContent = await readFile('./db/db.txt', 'utf-8');
    const data = await JSON.parse(fileContent);
    const boardIndex = data.findIndex(board => board.id === req.params.idBoard);
    if (boardIndex !== -1) {
      const tasksInCurrBoard = data[boardIndex].tasks;
      const taskIndex = tasksInCurrBoard.findIndex(
        task => task.id === Number(req.params.idTask)
      );
      if (taskIndex !== -1) {
        tasksInCurrBoard.splice(taskIndex, 1);
        await writeFile('./db/db.txt', JSON.stringify(data));
        res.status(200).json(data);
      } else {
        res.status(404).send('Task not found');
      }
    } else {
      res.status(404).send('Board not found');
    }
  } catch (error) {
    console.log(error);
  }
});

app.patch('/api/boards/:idBoard/tasks/:idTask', async (req, res) => {
  try {
    const fileContent = await readFile('./db/db.txt', 'utf-8');
    const data = await JSON.parse(fileContent);
    const boardIndex = data.findIndex(board => board.id === req.params.idBoard);
    const tasksInCurrBoard = data[boardIndex].tasks;
    const taskIndex = tasksInCurrBoard.findIndex(
      task => task.id === Number(req.params.idTask)
    );
    const newTask = {
      title: req.body.title,
      descr: req.body.descr,
      priority: req.body.priority,
    };

    tasksInCurrBoard[taskIndex] = {
      ...tasksInCurrBoard[taskIndex],
      ...newTask,
    };
    await writeFile('./db/db.txt', JSON.stringify(data));
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

app.patch('/api/boards', async (req, res) => {
  try {
    await writeFile('./db/db.txt', JSON.stringify(req.body));
    res.status(200).send('');
  } catch (e) {
    console.log(e);
  }
});

const PORT = 6565;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log('listening to server ...');
    });
  } catch (error) {
    console.log(error);
  }
};

start();
