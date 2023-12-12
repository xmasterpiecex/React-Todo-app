import { useState } from 'react';
import { DeleteTaskFunction, IBoard, ITask, UpdateTaskFunction } from '../models/models';
import { Task } from './one-task';

export function TasksBoard({ data }: { data: IBoard[] }) {
  const [lockalData, setLockalData] = useState(data);
  const [currentBoard, setCurrentBoard] = useState<IBoard>();
  const [currTask, setCurrTask] = useState<ITask | undefined>();
  const [edit, setEdit] = useState<number | null>(null);
  const [changing, setChanging] = useState<boolean>(false);

  const updateAction: UpdateTaskFunction = (id, title, descr, priority) => {
    setEdit(id);
    setChanging(!changing);
  };

  const deleteAction: DeleteTaskFunction = (task, board) => {
    const idx = board.tasks.indexOf(task);
    delete board.tasks[idx];
    console.log(board);
  };

  const handleDragStart = (board: IBoard, task: ITask) => {
    setCurrTask(task);
    setCurrentBoard(board);
  };
  const currTaskIdx = currentBoard?.tasks.indexOf(currTask!);

  const handleEmptyBoard = (e: React.DragEvent<HTMLDivElement>, board: IBoard) => {
    e.stopPropagation();
    e.preventDefault();
    if (board.id !== currentBoard?.id && board.tasks.length === 0) {
      board.tasks.push(currTask!);
      currentBoard?.tasks.splice(currTaskIdx!, 1);
      setCurrentBoard(board);
      console.log(currTask, e);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, board: IBoard, task: ITask, taskIdx: number) => {
    e.stopPropagation();
    e.preventDefault();

    const currTaskIdx: number | undefined = currentBoard?.tasks.indexOf(currTask!);

    if (board.id !== currentBoard?.id && currTask?.id !== task.id) {
      if (board.tasks.includes(currTask!)) {
        return;
      } else {
        board.tasks.splice(currTaskIdx!, 0, currTask!);
        currentBoard?.tasks.splice(currTaskIdx!, 1);
        setCurrentBoard(board);
      }
    }
    if (currTask?.id !== task.id && currentBoard?.id === board.id) {
      [board.tasks[taskIdx], board.tasks[currTaskIdx!]] = [board.tasks[currTaskIdx!], board.tasks[taskIdx]];

      const tar = lockalData.map(b => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard?.id) {
          return currentBoard!;
        }
        return b;
      });

      setLockalData(tar);
    }
  };

  return (
    <>
      {lockalData.map(board => {
        return (
          <div onDragEnter={e => handleEmptyBoard(e, board)} key={board.id} className='board-container'>
            {board.titleBoard}
            {board.tasks.map((task, taskId) => {
              const isEditing = edit === task.id;
              return (
                <div
                  draggable
                  onDragStart={() => {
                    handleDragStart(board, task);
                  }}
                  onDragEnter={e => {
                    handleDragEnter(e, board, task, taskId);
                  }}>
                  <Task
                    key={taskId}
                    updateTask={updateAction}
                    deleteTask={deleteAction}
                    taskProp={task}
                    board={board}
                    editing={isEditing}
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
