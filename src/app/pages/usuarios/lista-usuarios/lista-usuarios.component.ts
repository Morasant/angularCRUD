import { Component, OnInit } from '@angular/core';
import { Paginacion } from 'src/core/models/paginacion';
import { Usuario } from 'src/core/models/usuario';
import { UsuariosService } from 'src/core/services/usuarios.service';

declare var $: any;

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: 'lista-usuarios.component.html'
})

export class ListaUsuariosComponent implements OnInit {

  public columnas: string[];
  public listaUsuarios: Usuario[];
  public datosSeleccionado: any;
  public seleccionado: any;
  public sinUsuarios: boolean;
  public errorMsg: string;
  public loading: boolean;
  public paginado: Paginacion;
  public accion: '';

  constructor(
    private _usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.initVariables();
    this.getListadoUsuarios(this.paginado.page);
   }

  private initVariables(){
    this.columnas = ['#', 'Nombre', 'Email', 'Género', 'Status'];
    this.listaUsuarios = [];
    //this.usuario = new Usuario();
    this.datosSeleccionado = {};
    this.sinUsuarios = false;
    this.errorMsg = '';
    this.loading = true;

    this.paginado = {
      total: 0,
      pages: 0,
      page: 1,
      limit: 0
    }

  }

  public getListadoUsuarios(pagina: number){
    this._usuariosService.listadoUsuarios(pagina).subscribe(
      (response: any) => {
        if(response){
          this.listaUsuarios = response.data;
          console.log(this.listaUsuarios);

          this.paginado = response.meta.pagination;
          console.log(this.paginado);

          this.loading = false;
        }
        else {
          this.sinUsuarios = true;
          this.loading = false;
        }
      },
      (error) => {
        this.errorMsg = <any>error;
        if (this.errorMsg != null) {
        }
        console.log(this.errorMsg);
      }
    );
  }

  /* public getUsuario(idUsuario: any){
    this.seleccionado = idUsuario;
    this._usuariosService.detalleUsuario(idUsuario).subscribe(
      (response: any) => {
        if (response) {
          this.usuario = response.data;
          console.log(this.usuario);

          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.errorMsg = <any>error;
        if (this.errorMsg != null) {
        }
        console.log(this.errorMsg);
      }
    );
  } */

  public controlarPagina(pagina: number){
    this.getListadoUsuarios(pagina);
  }

  public seleccionarUsuario(row){
    this.datosSeleccionado = this.listaUsuarios.find((i) => i.id == row);
    console.log(this.datosSeleccionado);
  }

  public mostrarDetalle(){
    this.showModal('usuario');
  }

  public nuevoUsuario(){
    this.datosSeleccionado = {};
    this.showModal('nuevoUsuario');
  }

  public editarUsuario(){
    console.log(this.datosSeleccionado.id);

    if(this.datosSeleccionado.id != undefined){
      this.showModal('editarUsuario');
    }else{
      alert('Seleccione un usuario');
    }
  }

  public borrarUsuario(){
    console.log('entra eliminar usuario');
    let idDelete = this.datosSeleccionado.id;
    if(idDelete != undefined){
      this._usuariosService.eliminarUsuario(idDelete).subscribe(
        (response: any) => {
          if (response){
            console.log(response);
            alert('Se ha borrado el usuario.')
            this.getListadoUsuarios(this.paginado.page);
            this.datosSeleccionado = {};
          }
        },
        (error) => {
          this.errorMsg = <any>error;
          if (this.errorMsg != null) {
          }
          console.log(this.errorMsg);
        }
      );
    }else{
      alert('Seleccione un usuario');
    }
  }

  showModal(accion) {
    this.accion = accion;
    $("#modal-usuario").modal("show");
  }
}
