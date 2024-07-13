'use strict';

const data = require('../../data');

module.exports = (req, res) => {

    let body='';
    req.on('data',chunk=>body+=chunk);

    req.on('end',async ()=>{

        const parsedBody= new URLSearchParams(body);
        const name= parsedBody.get('name');
        const age = parsedBody.get('age');

       if(name&&age){
        const user= await data.addUser(name,parseInt(age));
        res.writeHead(201);//создано
        res.end(JSON.stringify(user));
       } 
       else{
        res.writeHead(400);//некорректный запрос
        res.end(JSON.stringify({message: 'Name and age are reqired'}));
       }
    });
}; 