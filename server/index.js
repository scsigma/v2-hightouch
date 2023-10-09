const express = require('express');
const cors = require('cors')
const port = 3001;

const app = express();
app.use(express.json());
app.use(cors())


app.get('/test', (req, res) => {
    res.send({ data: "Hello from the server!"});
    // res.json({ data: "Hello from the server!"}); // does this do the same thing?
})

app.post('/hightouch_sync', async (req, res) => {
    const {apiToken, syncId} = req.body;
    // res.json({ token, syncId})
    console.log('Token ', apiToken)
    console.log('Sync id', syncId)
    // fetch('https://api.hightouch.com/api/v1/syncs/1644239/trigger')

    const response = await fetch(`https://api.hightouch.com/api/v1/syncs/${syncId}/trigger`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiToken}`
        }
    });

    console.log('RESPONSE', response);

    if (!response.ok) {
        console.log('error')
    }

    res.send(response)
})

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})