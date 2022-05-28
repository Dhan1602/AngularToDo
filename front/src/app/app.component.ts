import { Component } from '@angular/core';
import { PeticionesService } from './peticiones.service';
import { Tareas } from './models/tareas';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fecha = "";
  constructor(public peticion: PeticionesService) { }
  ngOnInit(): void {
    let hoy = new Date();
    this.fecha = hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear();
    this.cargarTareas();
  }

  cargarTareas() {
    this.peticion.obtener().subscribe(ok => {
      this.peticion.tareas = ok;
    }, error => {
      console.log(error);
    });
  }
  crearTarea(form: NgForm) {
    if (form.value._id != null) {
      this.peticion.editar(form.value).subscribe(ok => {
        this.cargarTareas();
        form.reset();
      }, error => {
        console.log(error);
      })
      form.reset();
    } else {
      console.log(form.value);
      form.value.fecha = this.fecha;
      this.peticion.crear(form.value).subscribe(ok => {
        this.cargarTareas();
        form.reset();
      }, error => {
        console.log(error);
      })
    }
  }

  cargarCampos(campos: Tareas) {
    this.peticion.documentos = campos;
  }

  eliminarTarea(id: any, nombre: string) {
    console.log(id + nombre);
    var opcion = confirm("Esta seguro que desea eliminar la tarea " + nombre + "?")
    if (opcion) {
      this.peticion.eliminar(id).subscribe(ok => {
        this.cargarTareas();;
      }, error => {
        console.log(error);
      });
    };
  }
}