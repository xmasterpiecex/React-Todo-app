import { useState } from 'react';
import axios from 'axios';

export function CreateTodoForm({
  onClose,
}: {
  onClose: React.MouseEventHandler;
}) {
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [priority, setPriority] = useState('');

  const postData = () => {
    axios.post(`https://65579c69bd4bcef8b612f35e.mockapi.io/someData`, {
      title,
      descr,
      priority,
    });
    onClose;
  };

  return (
    <>
      <div className="modal-dialog">
        <div className="form-container">
          <button
            className="close-btn"
            onClick={onClose}
          >
            X
          </button>
          <div className="title-discrip">
            <span style={{ fontSize: '38px' }}>Title</span>
            <input
              type="text"
              className="input-text"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span style={{ fontSize: '38px' }}>Description</span>
            <textarea
              className="description"
              onChange={(e) => setDescr(e.target.value)}
            ></textarea>
          </div>
          <div className="priotity-container">
            <div className="priority-pair">
              <input
                type="radio"
                name="priority"
                onChange={() => {
                  setPriority('low');
                }}
              />
              <span style={{ fontSize: '38px' }}>Low priority</span>
            </div>
            <div className="priority-pair">
              <input
                type="radio"
                name="priority"
                onChange={() => {
                  setPriority('medium');
                }}
              />
              <span style={{ fontSize: '38px' }}>Medium priority</span>
            </div>
            <div className="priority-pair">
              <input
                type="radio"
                name="priority"
                onChange={() => {
                  setPriority('high');
                }}
              />
              <span style={{ fontSize: '38px' }}>High priority</span>
            </div>
          </div>
          <button onClick={postData}>Confirm</button>
        </div>
      </div>
    </>
  );
}