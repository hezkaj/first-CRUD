'use strict';

const data = require('../../data');

module.exports =async (req, res) => {
    const id = parseInt(req.url.split('/')[2]);
    const user=await data.getUserByID(id);
    if(user==''){
        res.writeHead(404);//не найдено
        res.end(JSON.stringify({ message: 'Route not found' }));
    }else{
        res.writeHead(200);//хорошо
        res.end(JSON.stringify(user));
    } 
};