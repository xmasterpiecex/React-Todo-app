import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CreateTodoForm } from './createTodoForm';
import { TasksBoard } from './tasksBoard';

export function AllBoardsContainer() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <button
          onClick={() => {
            setShowModal(true);
          }}>
          Add New TASK +
        </button>
      </div>
      {showModal && createPortal(<CreateTodoForm onClose={setShowModal} />, document.body)}

      <div className='content-container'>
        <TasksBoard rerenderOnCloseModal={showModal} />
      </div>
    </>
  );
}
