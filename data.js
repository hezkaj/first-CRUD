'use strict';

const {Client}= require('pg')
require('dotenv').config();
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})
client.connect() 

/*создание таблицы users и базы данных MyDB было произведено 
в приложении для управления postgreSQL - pgAdmin4*/

module.exports = {
    async getUsers(){
        try{
            const result =await client.query(`SELECT * FROM users`);
            return result.rows;
        }catch(err){
            console.error(err);
        }    
    },
    async addUser(n,a){
        try{
            const result=await client.query(
                `INSERT INTO users (name, age)
                VALUES ($1, $2)`,[n,a]);
            const finduser=await client.query(
                `SELECT * FROM users`);
            return finduser.rows[finduser.rows.length-1];
        }catch(err){
            console.error(err);
        }
    },  
    async deleteUser(id){
        try{ 
            const result= await client.query(
                `DELETE FROM users
                WHERE id=$1`,[id])
            return "The user has been deleted";    
        }catch(err){
            console.error(err);
        }
    },
    async getUserByID(id){
        try{
            const result= await client.query(
                `SELECT * FROM users
                WHERE id=$1`,[id]
            );
            return result.rows;
        }catch(err){
            console.error(err);
        }
    },
    async updateUser (id, name, age){
        try{
            const result= await client.query(
                `UPDATE users
                SET name=$2, age=$3
                 WHERE id=$1`,[id, name, age]
            );
            const finduser= await client.query(
                `SELECT * FROM users
                WHERE id=$1`,[id]
            );
            return finduser.rows;
        }catch(err){
            console.error(err);
        }
    }
}