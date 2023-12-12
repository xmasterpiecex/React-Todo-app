import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CreateTodoForm } from './createTodoForm';
import { TasksBoard } from './tasksBoard';
import { IBoard } from '../models/models';

export function AllBoardsContainer() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      titleBoard: 'New tasks',
      tasks: [
        {
          id: 1,
          title: 'THIS IS FIRST TASK',
          descr: 'THIS IS DISCRIPTION',
          priority: 'high',
        },
        {
          id: 2,
          title: 'SecTASK',
          descr: 'THIS IS another DISCRIPTION',
          priority: 'medium',
        },
        {
          id: 3,
          title: 'task for test',
          descr: 'probably the most dangerous discription',
          priority: 'low',
        },
      ],
    },
    {
      id: 2,
      titleBoard: 'In progress',
      tasks: [
        {
          id: 10,
          title: 'ongoing task',
          descr: 'THIS IS DISCRIPTION',
          priority: 'low',
        },
        {
          id: 11,
          title: 'WJO',
          descr: '555555543',
          priority: 'low',
        },
      ],
    },
  ]);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div style={{ margin: '50px' }}>
        <button
          onClick={() => {
            setShowModal(true);
          }}>
          Add New TASK +
        </button>
      </div>
      {showModal && createPortal(<CreateTodoForm editing={false} onClose={setShowModal} />, document.body)}

      <div className='content-container'>
        <TasksBoard data={boards as IBoard[]} />
      </div>
    </>
  );
}

// const fetchAllTasks = async () => {
//   await axios
//     .get(`https://65579c69bd4bcef8b612f35e.mockapi.io/someData`)
//     .then((res) => set(res.data));
// };

// useEffect(() => {
//   fetchAllTasks();
// }, [showModal]);
