'use strict';

const http = require('http');
const port = 3000;
const handler = require('./routes/router');
const serv = http.createServer(handler);

serv.listen(port, () => { 
    console.log(`Server running on port ${port}`); });