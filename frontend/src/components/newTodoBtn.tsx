import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CreateTodoForm } from './createTodoForm';

export function NewTodoBtn({ text }: { text: string }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div style={{ margin: '50px' }}>
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        {text}
      </button>
      {showModal &&
        createPortal(<CreateTodoForm onClose={setShowModal} />, document.body)}
    </div>
  );
}
