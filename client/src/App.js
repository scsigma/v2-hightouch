import React, {useEffect} from 'react';

const App = () => {

  const tester = () => {
    const data = fetch('/test')
      .then((res) => res.json())
      .then((data) => console.log(data))

    return data
  }

  const trigger_sync = () => {

    const syncId = '1644239';
    const apiToken = '98817d9d-cd97-452c-be64-b76bbd48ddaa'

    fetch(`https://api.hightouch.com/api/v1/syncs/${syncId}/trigger`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
      }
    })
  }


  useEffect(() => {
    tester();
  }, [])
  
  
  return (
    <div>
      Hello World
      <button
      onClick={() => {
        console.log('clicked!')
        fetch('/hightouch_sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "token": "i am a token",
            "syncId": "i am a sync id"
          })
        })
        trigger_sync()
        return tester()
      }}
      >Click Me</button>
    </div>
  );
}

export default App;
