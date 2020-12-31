import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  listadoUsuarios(pagina?) {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this.http.get(`${environment.urlApi}/users?page=${pagina}`, { headers });
  }

  detalleUsuario(id){
    let headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this.http.get(`${environment.urlApi}/users/${id}`, { headers });
  }

  crearUsuario(args){
    console.log(args);
    let json = JSON.stringify(args);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.token}`,
    });
    return this.http.post(`${environment.urlApi}/users`, json, { headers });
  }

  editarUsuario(args, id){

    let json = JSON.stringify(args);
    console.log(id + " --> " +json);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.token}`,
    });
    return this.http.put(`${environment.urlApi}/users/${id}`, json, { headers });
  }

  eliminarUsuario(id){
    console.log(id);
    let headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this.http.delete(`${environment.urlApi}/users/${id}`, { headers });
  }

}
