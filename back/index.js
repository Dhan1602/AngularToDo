const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect( process.env.LINK )
.then( e=> console.log("Se ha conectado con la base de datos"))
.catch(error=> console.log("Hubo un error"));

const tareasSchema = require("./modelosJS/tareas");

app.get("/tareas",async (req,res)=>{
    let notas = await tareasSchema.find()
    res.send(notas);
});
app.post("/tarea",async (req,res)=>{
    let nuevo = new tareasSchema(req.body);
    await nuevo.save();
    res.send({response: "todo ok"});
});
app.post("/tarea/:id",async (req,res)=>{
    await tareasSchema.updateOne({_id:req.params.id},req.body);
    res.send({response: "todo ok"});
});
app.delete("/tarea/:id",async (req,res)=>{
    await tareasSchema.findByIdAndRemove(req.params.id);
    res.send({response: "todo ok"});
});

app.listen(3000);