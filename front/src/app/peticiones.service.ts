import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tareas } from './models/tareas';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  tareas: Tareas[] = [];

  documentos: Tareas = {
    titulo: "",
    des: "",
    fecha: "",
    etiqueta: ""
  };

  constructor(private http: HttpClient) { }

  obtener() {
    return this.http.get<Tareas[]>("http://localhost:3000/tareas");
  }
  crear(cuerpo: any) {
    return this.http.post("http://localhost:3000/tarea", cuerpo);
  }
  editar(form: Tareas) {
    return this.http.post("http://localhost:3000/tarea/" + form._id, form);
  }
  eliminar(id: any) {
    return this.http.delete("http://localhost:3000/tarea/" + id);
  }
}
