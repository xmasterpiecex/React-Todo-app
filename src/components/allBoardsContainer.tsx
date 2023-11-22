import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { TasksBoard } from './tasksBoard';
import axios from 'axios';
import { CreateTodoForm } from './createTodoForm';
type DeleteTaskFunction = (id: string | number) => Promise<void>;
export interface ITasks {
  title: string;
  descr: string;
  priority: string;
  id: number;
}

export function AllBoardsContainer() {
  const [data, setData] = useState<ITasks[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchAllTasks = async () => {
    await axios
      .get(`https://65579c69bd4bcef8b612f35e.mockapi.io/someData`)
      .then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchAllTasks();
  }, [showModal]);

  const deleteAction: DeleteTaskFunction = async (id) => {
    await axios.delete(
      `https://65579c69bd4bcef8b612f35e.mockapi.io/someData/${id}`
    );
    const updatedData = data.filter((item) => {
      id !== item.id;
    });
    setData(updatedData);
  };

  return (
    <>
      <div style={{ margin: '50px' }}>
        <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add New TASK +
        </button>
      </div>
      {showModal &&
        createPortal(<CreateTodoForm onClose={setShowModal} />, document.body)}
      <div className="boards">
        <div className="content-container">
          <TasksBoard
            data={data}
            deleteTask={deleteAction}
          />
        </div>
      </div>
    </>
  );
}
