const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser")
const knex = require('knex')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//mysql connection, ใช้ฐานข้อมูลบน phpMyAdmin ครับ
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project_soft"
})

connection.connect((err=>{
    if(err) {
        console.log(`Error can't connect to MySQL Database = ${err}`);
        return;
    }
    console.log("Connected to Server Successfully");
}))


//3 Medthod(POST) Insert data จาก api postman และลง image_tbl, id ตั้ง auto increment
app.post("/insertData", (req, res) => {

    let {name, avatar, address} = req.body

    try {
        connection.query(
            "INSERT INTO image_tbl(createdAt, name, avatar, address) VALUES(?, ?, ?, ?)", [new Date(), name, avatar, address],
            (err, result, fields) =>{
                if(err) {
                    console.log(`Error inserting data into database ${err}`);
                    return res.status(400).send();
                }
                return res.status(201).json({message: "New data successfully created"})
            }
        )
    }catch(err) {
        console.log(err)
        return res.status(500).send();
    }

})

//4 Method(GET) ดึงข้อมูลจาก image_tbl และตอบกลับเป็น json
app.get("/readData", (req, res)=>{
    try {
        connection.query(
            "SELECT * FROM image_tbl",
            (err, result, fields) =>{
                if(err) {
                    console.log(`Error can't read data ${err}`);
                    return res.status(400).send();
                }
                return res.status(200).json(result)
            }
        )
    } catch(err) {
        console.log(err);
        return res.status(500).send()
    }
})

//5 Method(POST) Seach Data จาก image_tbl, //ค้นหาจาก id
app.post("/searchData/:id", (req, res) =>{

    let search = req.params.id;

    try {
        connection.query(
            "SELECT * FROM image_tbl WHERE id = ?", [search],
            (err, result, fields) =>{
                if(err) {
                    console.log(`Error can't read data ${err}`);
                    return res.status(400).send();
                }
                return res.status(200).json(result)
            }
        )
    } catch(err) {
        console.log(err);
        return res.status(500).send()
    }
})

app.listen(3000, ()=>{
    console.log("Server running on Port 3000");
})