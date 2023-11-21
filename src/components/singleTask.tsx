export interface ITasks {
  title: string;
  descr: string;
  priority: string;
  id: number;
}

export function SingleTask({ props }: { props: ITasks }) {
  return (
    <>
      <div className="task-container">
        <div className="task-content">
          <div className="task-header">
            <span style={{ color: 'black' }}>{props.title}</span>
            <button className="close-btn">Delete</button>
          </div>
          <div className="task-description">
            <span style={{ color: 'black' }}>{props.descr}</span>
          </div>
        </div>
      </div>
    </>
  );
}
