import { ITasks } from './allBoardsContainer';

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
              className={
                item.priority === 'low'
                  ? 'task-container low'
                  : item.priority === 'medium'
                  ? 'task-container medium'
                  : item.priority === 'high'
                  ? 'task-container high'
                  : ''
              }
              key={item.id}
            >
              <div className="task-content">
                <div className="task-header">
                  <button className="close-btn">Update</button>
                  <span style={{ color: 'black', lineBreak: 'anywhere' }}>
                    {item.title}
                  </span>

                  <button
                    className="close-btn"
                    onClick={() => {
                      deleteTask(item.id);
                    }}
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
