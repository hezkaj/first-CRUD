'use strict';

const data = require('../../data');

module.exports = (req, res) => {
    const id = parseInt(req.url.split('/')[2]);

    let body='';
    req.on('data', chunk => body += chunk);

    req.on('end',async ()=>{
        const parsedBody= new URLSearchParams(body);
        const name= parsedBody.get('name');
        const age = parsedBody.get('age');
        const user=await data.getUserByID(id);
        if(user==''){
            res.writeHead(404);//не найдено
            res.end(JSON.stringify({ message: 'Route not found' }));
        }else{
            const updatedUser=await data.updateUser(id, name, parseInt(age));
            res.writeHead(200);//хорошо
            res.end(JSON.stringify(updatedUser));
        }
        
    });
};