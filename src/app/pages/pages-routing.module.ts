import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoComentariosComponent } from './comentarios/listado-comentarios/listado-comentarios.component';
import { HomeComponent } from './home/home.component';
import { ListaProductosComponent } from './productos/lista-productos/lista-productos.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { ModalUsuarioComponent } from './usuarios/modal-usuario/modal-usuario.component';

const routes: Routes = [

  //Principal
  {
  path: "home",
  component: HomeComponent
  },

  //Routing Usuarios
  {
    path: "usuarios",
    component: ListaUsuariosComponent,
    children:[
      {
        path: "usuario/:id",
        component: ModalUsuarioComponent
      },
      {
        path: "usuario/nuevo",
        component: ModalUsuarioComponent
      },
      {
        path: "usuario/editar",
        component: ModalUsuarioComponent
      },
      {
        path: "usuario/eliminar",
        component: ModalUsuarioComponent
      },
    ]
  },

  //Routing Productos
  {
    path: "productos",
    component: ListaProductosComponent
  },

  //Routing Comentarios
  {
    path: "comentarios",
    component: ListadoComentariosComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
