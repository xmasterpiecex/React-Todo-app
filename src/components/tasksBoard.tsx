import { ITasks } from './singleTask';
type DeleteTaskFunction = (id: string | number) => Promise<void>;

export function TasksBoard({
  data,
  deleteTask,
}: {
  data: ITasks[];
  deleteTask: DeleteTaskFunction;
}) {
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
                  <span style={{ color: 'black', lineBreak: 'anywhere' }}>
                    {item.title}
                  </span>
                  <button
                    className="close-btn"
                    onClick={() => deleteTask(item.id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="task-description">
                  <p>{item.descr}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
