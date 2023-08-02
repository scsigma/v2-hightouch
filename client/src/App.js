import React, {useEffect} from 'react';

function App() {
  useEffect(() => {
    fetch('/test')
      .then((res) => res.json())
      .then((data) => console.log(data))
  }, [])
  return (
    <div>
      Hello World
    </div>
  );
}

export default App;
