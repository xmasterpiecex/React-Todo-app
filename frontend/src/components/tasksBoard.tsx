import { useEffect, useState } from 'react';
import { DeleteTaskFunction, IBoard, ITask, UpdateTaskFunction } from '../models/models';
import { Task } from './one-task';
import axios from 'axios';

export function TasksBoard({ rerenderOnCloseModal }: { rerenderOnCloseModal: boolean }) {
  const [data, setData] = useState<IBoard[]>([]);
  const [currentBoard, setCurrentBoard] = useState<IBoard | undefined>();
  const [currTask, setCurrTask] = useState<ITask | undefined>();
  const [currTaskID, setCurrTaskID] = useState<number | null>(null);
  const [changing, setChanging] = useState<boolean>(false);
  const currTaskIdx = currentBoard?.tasks.indexOf(currTask!);

  const fetchAllTasks = async () => {
    const response = await axios.get(`/api/boards`);
    await setData(response.data);
  };

  useEffect(() => {
    if (!rerenderOnCloseModal) {
      fetchAllTasks();
    }
  }, [rerenderOnCloseModal]);

  const updateAction: UpdateTaskFunction = (board, id, title, descr, priority) => {
    setChanging(!changing);

    if (currTaskID === id) {
      axios.patch(`/api/boards/${board.id}/tasks/${id}`, {
        title,
        descr,
        priority,
      });
      setCurrTaskID(null);
    } else {
      setCurrTaskID(id);
    }
  };

  const deleteAction: DeleteTaskFunction = (task, board) => {
    axios.delete(`/api/boards/${board.id}/tasks/${task.id}`);
    const idx = board.tasks.indexOf(task);
    delete board.tasks[idx];
    setData(
      data.map(b => {
        return b;
      })
    );
  };

  const updateDnD = async () => {
    await axios.patch('/api/boards', [...data]);
  };

  const handleDragStart = (board: IBoard, task: ITask) => {
    setCurrTask(task);
    setCurrentBoard(board);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    updateDnD();
  };

  const handleEmptyBoard = (e: React.DragEvent<HTMLDivElement>, board: IBoard) => {
    e.preventDefault();
    if (board.id !== currentBoard?.id) {
      currentBoard!.tasks = currentBoard!.tasks.filter(itme => itme.id !== currTask!.id);
      board.tasks.push(currTask!);
      setCurrentBoard(board);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, board: IBoard, task: ITask, taskIdx: number) => {
    e.preventDefault();

    if (currTask?.id !== task.id && currentBoard?.id === board.id) {
      [board.tasks[taskIdx], board.tasks[currTaskIdx!]] = [board.tasks[currTaskIdx!], board.tasks[taskIdx]];

      const tar = data.map(b => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard?.id) {
          return currentBoard!;
        }
        return b;
      });

      setData(tar);
    }
  };

  return (
    <>
      {data.map(board => {
        return (
          <div
            key={board.id}
            onDragOver={e => {
              e.preventDefault();
            }}
            onDragEnter={e => handleEmptyBoard(e, board)}
            onDrop={e => {
              handleDrop(e);
            }}
            className='board-container'>
            {board.titleBoard}
            {board.tasks.map((task, taskIdx) => {
              const isCurrTaskID = currTaskID === task.id;
              return (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => {
                    handleDragStart(board, task);
                  }}
                  onDragEnter={e => {
                    handleDragEnter(e, board, task, taskIdx);
                  }}>
                  <Task
                    key={taskIdx}
                    updateTask={updateAction}
                    deleteTask={deleteAction}
                    taskProp={task}
                    board={board}
                    isCurrTaskID={isCurrTaskID}
                    changing={changing}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
