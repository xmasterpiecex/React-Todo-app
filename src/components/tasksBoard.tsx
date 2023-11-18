import axios from 'axios';
import { useState, useEffect } from 'react';
import { ITasks } from './singleTask';
// import { SingleTask } from './singleTask';

export function TasksBoard() {
  const [data, setData] = useState<ITasks[]>([]);

  useEffect(() => {
    axios
      .get(`https://65579c69bd4bcef8b612f35e.mockapi.io/someData`)
      .then((response) => setData(response.data));
  }, []);

  return (
    <>
      <div className="board-container">
        {data.map((item) => {
          return (
            <div
              className="task-container"
              key={item.id}
            >
              <div className="task-content">
                <div className="task-header">
                  <span style={{ color: 'black' }}>{item.title}</span>
                  <button className="close-btn">Delete</button>
                </div>
                <div className="task-description">
                  <span style={{ color: 'black' }}>{item.descr}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
