import React, {useEffect, useState} from 'react';
import { client, useConfig } from '@sigmacomputing/plugin';
import { ChakraProvider, Button, Box } from '@chakra-ui/react';
import { sync } from 'framer-motion';

// ---- Sigma Config -----
client.config.configureEditorPanel([
  { name: "Hightouch API Token", type: "text"},
  { name: "Sync ID", type: "text"},
  { name: "Button Text", type: "text", defaultValue: "Export to HubSpot"}
]);
// -----------------------

const allSigmaDataReceived = (config) => {
  return config['Hightouch API Token'] && config['Sync ID'];
}

const App = () => {

  // Sigma Config Inputs
  const [apiToken, setApiToken] = useState(null);
  const [syncId, setSyncId] = useState(null);
  const [buttonString, setButtonString] = useState(null);
  
  // Data and Event Handling
  const [allData, setAllData] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  // sigma stuff
  const config = useConfig();
  if (!allSigmaDataReceived(config)) {
    // this means that data is missing from the config panel in Sigma
    console.log('DATA IS MISSING')
  }


  useEffect(() => {
    setAllData(allSigmaDataReceived(config))
    if (allData) {
      setApiToken(config['Hightouch API Token']);
      setSyncId(config['Sync ID']);
      if (!config['Button Text']) {
        setButtonString('Export to HubSpot')
      } else {
        setButtonString(config['Button Text']);
      }
    }
  }, [config])



  const triggerSync = async (syncId, apiToken) => {
    // api request with the specified sync Id
    // --------- ENTER ALL API REQUESTS HERE ----------
    // await fetch(`https://api.hightouch.com/api/v1/syncs/${syncId}/trigger`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${apiToken}`
    //   }
    // })

    const res = await fetch('/test' , {
      method: 'GET',
      headers :{
        'Content-Type': 'application/json'
      }
    })

    // console.log('THIS IS RES', res)

    const data = await res.json();

    console.log('THIS IS DATA', data);



    const hightouchRes = await fetch('/hightouch_sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({apiToken: apiToken, syncId: syncId})
    });

  
    console.log('HDATA', hightouchRes.status);

  }


  // --------------------------------------------------

  const handleClick = () => {
    setButtonClicked(true);

    // set the button clicked back to false so the icon goes away
    setTimeout(() => {
      setButtonClicked(false);
    }, 5000); // 5000ms = 5s
  }

  return (
    <ChakraProvider>
      <Box justifyContent="center" display="flex" alignItems="center" paddingTop="9px">
        <Button
        backgroundColor="#ff5c35"
        color="white"
        _hover={{ backgroundColor: "#fff4f2", color: "#ff5c35"}}
        style={{ width: '200px'}}
        onClick={() => {
          if (allSigmaDataReceived) {
            triggerSync(syncId, apiToken)
            handleClick()
          } 
        }}
        >{buttonString}</Button>
        {buttonClicked && 
          <div style={{position: 'absolute', width: '50px', left: '76%'}}>✅</div>
        }
      </Box>
    </ChakraProvider>
  );
}

export default App;