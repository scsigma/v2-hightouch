import React, {useEffect, useState} from 'react';
import { client, useConfig } from '@sigmacomputing/plugin';
import { ChakraProvider, Button, Cente, Box, Flex } from '@chakra-ui/react';

// ---- Sigma Config -----
client.config.configureEditorPanel([
  { name: "source", type: "element"},
  { name: "Hightouch API Token", type: "text"},
  { name: "List Creator syncId", type: "text"},
  { name: "Contact List Update syncId", type: "text"}
]);
// -----------------------

const allSigmaDataReceived = (config) => {
  if (config['Hightouch API Token'] == "" || config['List Creator syncId'] == "" || config['Contact List Update syncId'] == "") {
    return false; 
  }

  return true;
}

const App = () => {

  let [apiToken, setApiToken] = useState(null);
  let [listCreatorSyncId, setListCreatorSyncId] = useState(null);
  let [contactSyncId, setContactSyncId] = useState(null);
  let [allData, setAllData] = useState(false);
  // sigma stuff
  const config = useConfig();
  if (!allSigmaDataReceived(config)) {
    // this means that data is missing
    console.log('DATA IS MISSING')
  }


  useEffect(() => {
    setAllData(allSigmaDataReceived(config))
    if (allData) {
      setApiToken(config['Hightouch API Token']);
      setListCreatorSyncId(config['List Creator syncId']);
      setContactSyncId(config['Contact List Update syncId']);
    }
  }, [config])



  const trigger_sync = async (listCreatorSyncId, contactSyncId, apiToken) => {
    // create or update the new campaign list
    await fetch(`https://api.hightouch.com/api/v1/syncs/${listCreatorSyncId}/trigger`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
      }
    })

    // create or update the overall contact list
    await fetch(`https://api.hightouch.com/api/v1/syncs/${contactSyncId}/trigger`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
      }
    })
  }

  return (
    <ChakraProvider>
      <Box justifyContent="center" display="flex" alignItems="center" paddingTop="9px">
        <Button
        backgroundColor="#ff5c35"
        color="white"
        _hover={{ backgroundColor: "#fff4f2", color: "#ff5c35"}}
        onClick={() => {
          if (allSigmaDataReceived) {
            console.log('clicked!')
            console.log('apiToken', apiToken)
            console.log('List Creator syncId', listCreatorSyncId)
            console.log('Contact List syncId', contactSyncId)
            trigger_sync(listCreatorSyncId, contactSyncId, apiToken)
          } else {
            console.log('click not working')
          }
        }}
        >Export to Hubspot</Button>
      </Box>
    </ChakraProvider>
  );
}

export default App;