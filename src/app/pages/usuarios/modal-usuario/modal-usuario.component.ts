import { Component, Input, NgZone, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/core/models/usuario';
import { UsuariosService } from 'src/core/services/usuarios.service';

declare var $: any;

@Component({
  selector: 'app-modal-usuario',
  templateUrl: 'modal-usuario.component.html'
})

export class ModalUsuarioComponent implements OnInit, OnChanges {
  public usuarioForm: FormGroup;
  public loading;
  public errorMsg;

  @Input() accion: string;
  @Input() usuario: any;

  constructor(
    private _usuariosService: UsuariosService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initVariables();
  }

  ngOnChanges() {

    /* console.log(this.usuario);
    console.log(this.usuarioForm);

    if(this.accion != 'nuevoUsuario' && this.usuario != undefined){
      this.usuarioModal = {
        id: this.usuario.id,
        name: this.usuario.name,
        email: this.usuario.email,
        gender: this.usuario.gender,
        status: this.usuario.status
      }
    } else{
      this.usuarioForm.reset(this.usuarioForm.value);
    } */
  }

  private initVariables(){
    this.loading = false;

    this.usuario = {
      id: '',
      name: '',
      email: '',
      gender: '',
      status: ''
    };

    this.usuarioForm = this._formBuilder.group({
      id: ['', Validators.required],
      name: [''],
      email: [''],
      gender: [''],
      status: ['']
    });
  }

  public editUsuario(usuario){
    this.loading = true;
    let contenido = {
      name: usuario.name,
      email: usuario.email,
      gender: usuario.gender,
      status: usuario.status,
    };
    console.log(usuario);
    this._usuariosService.editarUsuario(contenido, usuario.id).subscribe(
      (response: any) => {
        if (response) {
          if (response.code == (200 || 201)){
            alert('El usuario se ha modificado correctamente')
          }
          else{
            alert('No se ha podido añadir el usuario: ' + response.data.message);
          }
          this.closeModal();
        }
        console.log(response);
        this.loading = false;
      },
      (error) => {
        console.log(error);
        alert('No se ha podido modificar el usuario');
      }
    );
  }

  public addUsuario(usuario){
    this.loading = true;
    let contenido = {
      name: usuario.name,
      email: usuario.email,
      gender: usuario.gender,
      status: usuario.status,
    };
    console.log(usuario);
    this._usuariosService.crearUsuario(contenido).subscribe(
      (response: any) => {
        if (response) {
          //console.log(response);
          if (response.code == (200 || 201)){
            alert('El usuario se ha añadido correctamente')
          }
          else{
            alert('No se ha podido añadir el usuario: ' + response.data.message);
          }
          this.closeModal();
        }
        this.loading = false;
      },
      (error) => {
        console.log(error);
        alert('No se ha podido añadir el usuario');
      }
    );
  }

  public closeModal(){
    $("#modal-usuario").modal("hide");
  }

  public onClose(){
    console.log('cerrando');
    console.log(this.usuarioForm.value);
    console.log(this.usuario);

    this.usuarioForm = this._formBuilder.group({
      id: [this.usuario.id],
      name: [this.usuario.name],
      email: [this.usuario.email],
      gender: [this.usuario.gender],
      status: [this.usuario.status]
    });
  }

}
