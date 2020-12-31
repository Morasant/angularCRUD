import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private http: HttpClient) {}

  listadoProductos(args?) {
    
    let pagina = this.serverSidePagination(args);

    let headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this.http.get(`${environment.urlApi}/products?page=${pagina}`, { headers });
  }

  detalleProducto(id){
    let headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this.http.get(`${environment.urlApi}/products/${id}`, { headers });
  }

  crearProducto(args){
    let json = JSON.stringify(args);
    let params = `json=${json}`;
    let headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this.http.post(`${environment.urlApi}/products`, params, { headers });
  }

  editarProducto(args, id){
    let json = JSON.stringify(args);
    let params = `json=${json}`;
    let headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this.http.post(`${environment.urlApi}/products/${id}`, params, { headers });
  }

  eliminarProducto(id){
    let headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this.http.delete(`${environment.urlApi}/products/${id}`, { headers });
  }

  serverSidePagination(args?){
    let length = args.length;
    let start = args.start;
    let pagina = start/length +1;
    return pagina;
  }

}
