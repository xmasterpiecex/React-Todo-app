import { useState } from 'react';
import { ITasks } from './allBoardsContainer';

type DeleteTaskFunction = (id: string | number) => Promise<void>;
type UpdateTaskFunction = (
  id: string | number,
  title: string,
  descr: string
) => void;

export function TasksBoard({
  data,
  deleteTask,
  editing,
  updateTask,
}: {
  data: ITasks[];
  deleteTask: DeleteTaskFunction;
  updateTask: UpdateTaskFunction;
  editing: boolean;
}) {
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const handlerChangesT = (event: React.FormEvent<HTMLDivElement>) => {
    const newContent = event.currentTarget.textContent || '';
    setTitle(newContent);
  };
  const handlerChangesD = (event: React.FormEvent<HTMLDivElement>) => {
    const newContent = event.currentTarget.textContent || '';
    setDescr(newContent);
  };

  return (
    <>
      <div className="board-container">
        {data.map((item) => {
          const isEditing = editingItemId === item.id;
          return (
            <div
              className={`task-container ${item.priority}`}
              key={item.id}
            >
              <div className="task-content">
                <div className="task-header">
                  <button
                    disabled={editing && !isEditing}
                    className="close-btn"
                    onClick={() => {
                      updateTask(item.id, title, descr);
                      setEditingItemId(item.id);
                    }}
                  >
                    {isEditing && editing ? 'OK' : 'Update'}
                  </button>
                  <span
                    onInput={handlerChangesT}
                    className={isEditing && editing ? 'updating' : 'defoult'}
                    contentEditable={
                      isEditing && editing === true ? 'true' : 'false'
                    }
                  >
                    {item.title}
                  </span>

                  <button
                    disabled={editing && !isEditing}
                    className="close-btn"
                    onClick={() => {
                      setEditingItemId(null);

                      deleteTask(item.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
                <div className="task-description">
                  <p
                    onInput={handlerChangesD}
                    className={isEditing && editing ? 'updating' : 'defoult'}
                    contentEditable={
                      isEditing && editing === true ? 'true' : 'false'
                    }
                  >
                    {item.descr}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
