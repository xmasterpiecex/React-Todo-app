import { useState } from 'react';
import { Header } from './components/header';
import { TasksBoard } from './components/tasksBoard';
import { NewTodoBtn } from './components/newTodoBtn';
// import axios from 'axios';
// import { SingleTask } from './components/singleTask';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <NewTodoBtn text="Add New Todo +" />
      <div className="boards">
        <div className="content-container">
          <TasksBoard />
        </div>
      </div>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  );
}

export default App;
