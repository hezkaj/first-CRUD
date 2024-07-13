'use strict';

const data = require('../../data');

module.exports =async (req, res) => {
    const users=await data.getUsers();
    res.writeHead(200);//хорошо
    res.end(JSON.stringify(users));
    
};