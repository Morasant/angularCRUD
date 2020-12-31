import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { HomeComponent } from './home/home.component';
import { routing } from './pages-routing.module';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { ListaProductosComponent } from './productos/lista-productos/lista-productos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalUsuarioComponent } from './usuarios/modal-usuario/modal-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ListadoComentariosComponent } from './comentarios/listado-comentarios/listado-comentarios.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListaUsuariosComponent,
    ModalUsuarioComponent,
    ListaProductosComponent,
    ListadoComentariosComponent,
  ],
  imports: [
    CommonModule,
    routing,
    ComponentsModule,
    NgxDatatableModule,
    DataTablesModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: []
})
export class PagesModule { }
