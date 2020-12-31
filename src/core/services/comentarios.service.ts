import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  constructor(private http: HttpClient) {}

  listadoComentarios(pagina?) {

    console.log(pagina);

    let headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this.http.get(`${environment.urlApi}/comments?page=${pagina}`, { headers });
  }

  detalleComentario(id){
    let headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this.http.get(`${environment.urlApi}/comments/${id}`, { headers });
  }

  crearComentario(args){
    let json = JSON.stringify(args);
    let params = `json=${json}`;
    let headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this.http.post(`${environment.urlApi}/comments`, params, { headers });
  }

  editarComentario(args, id){
    let json = JSON.stringify(args);
    let params = `json=${json}`;
    let headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this.http.post(`${environment.urlApi}/comments/${id}`, params, { headers });
  }

  eliminarComentario(id){
    let headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this.http.delete(`${environment.urlApi}/comments/${id}`, { headers });
  }

}
