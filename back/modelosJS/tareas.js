const mongoose  =require("mongoose");
const Schema = mongoose.Schema;

let tareas = new Schema({
    titulo: String,
    des: String,
    fecha: {
        type: String,
        default: "indefinido"
    },
    etiqueta: {
        type: String,
        default: "tarea"
    }
});

module.exports = mongoose.model( "Tareas" , tareas);