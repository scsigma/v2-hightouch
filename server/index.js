const express = require('express');

const port = 3001;

const app = express();

app.get('/test', (req, res) => {
    res.send({ data: "Hello from the server!"})
})

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})