import { useState } from 'react';
import { Header } from './components/header';
import { AllBoardsContainer } from './components/allBoardsContainer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <AllBoardsContainer />
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  );
}

export default App;
