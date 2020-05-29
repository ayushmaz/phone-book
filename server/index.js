const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db")
const path = require('path');

app.use(cors());
app.use(express.json());

// app.use(express.static(path.join(__dirname, 'build')));


// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

//create a contact
app.post("/contacts" , async(req , res)=>{
    try{
        console.log(req.body)
        const {name,  phone , dob , email} = req.body
        const newContact = await pool.query("INSERT INTO PHONEBOOK(name , phone , dob ,email) values($1, $2 ,$3 , $4) RETURNING *" , 
        [name , phone , dob , email]);
        res.json(newContact);
    }catch(err){
        console.error(err.message)
    }
});

//get all contacts
app.get('/contacts' , async(req , res)=>{
    try {
        const allContacts = await pool.query("SELECT * FROM PHONEBOOK");
        res.json(allContacts.rows)
    } catch (error) {
        console.error(error.message);
    }
});

//update a contact
app.put('/contacts/:id', async(req , res) => {
    try {
        const {id }= req.params;
        const {name,  phone , dob , email} = req.body;
        const updateContacts = await pool.query("UPDATE PHONEBOOK SET name = $1 , phone = $2 , dob = $3 , email = $4 WHERE id = $5",
        [name , phone , dob , email , id]);
        res.json("Todo was update");

    } catch (err) {
        console.error(err.message);
    }
})

//delete
app.delete('/contacts/:id' , async(req , res)=>{
    const {id} = req.params;
    const deleteContact = await pool.query("DELETE FROM PHONEBOOK WHERE id = $1",[id]);
})

app.listen(5000 , ()=>{
    console.log("Server has started on port 5000");
});