import { useState } from 'react';
import { DeleteTaskFunction, IBoard, ITask, UpdateTaskFunction } from '../models/models';

export function Task({
  updateTask,
  deleteTask,
  taskProp,
  isCurrTaskID,
  changing,
  board,
}: {
  updateTask: UpdateTaskFunction;
  deleteTask: DeleteTaskFunction;
  taskProp: ITask;
  isCurrTaskID: boolean;
  changing: boolean;
  board: IBoard;
}) {
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [priority, setPriority] = useState('');

  const handlerUpdateBtn = (currTask: ITask) => {
    updateTask(board, currTask.id, title, descr, priority);
  };

  return (
    <>
      <div className={`task-container ${taskProp.priority}`} key={taskProp.id}>
        <div className='task-content'>
          <div className='task-header'>
            <button onClick={() => handlerUpdateBtn(taskProp)} disabled={changing && !isCurrTaskID} className='close-btn'>
              {changing && isCurrTaskID ? 'OK' : 'Update'}
            </button>
            <input
              type='text'
              name='title'
              defaultValue={taskProp.title}
              readOnly={!isCurrTaskID}
              onChange={e => {
                setTitle(e.target.value);
              }}
            />
            <button
              disabled={changing && !isCurrTaskID}
              className='close-btn'
              onClick={() => {
                deleteTask(taskProp, board);
              }}>
              Delete
            </button>
          </div>
          <div className='task-description'>
            <input
              type='text'
              name='description'
              defaultValue={taskProp.descr}
              readOnly={!isCurrTaskID}
              onChange={e => {
                setDescr(e.target.value);
              }}
            />
          </div>
        </div>
        {changing && isCurrTaskID && (
          <div className='choose-priority'>
            <span style={{ padding: '5px', color: 'black', fontSize: '24px' }}>Low</span>
            <input
              type='radio'
              name='priority'
              onChange={() => {
                setPriority('low');
                taskProp.priority = 'low';
              }}
              value={'low'}
            />
            <span style={{ padding: '5px', color: 'black', fontSize: '24px' }}>Medium</span>
            <input
              type='radio'
              name='priority'
              onChange={() => {
                setPriority('medium');
                taskProp.priority = 'medium';
              }}
              value={'medium'}
            />
            <span style={{ padding: '5px', color: 'black', fontSize: '24px' }}>High</span>
            <input
              type='radio'
              name='priority'
              onChange={() => {
                setPriority('high');
                taskProp.priority = 'high';
              }}
              value={'high'}
            />
          </div>
        )}
      </div>
    </>
  );
}
