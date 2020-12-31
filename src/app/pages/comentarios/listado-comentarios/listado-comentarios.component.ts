import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Comentario } from 'src/core/models/comentarios';
import { Paginacion } from 'src/core/models/paginacion';
import { ComentariosService } from 'src/core/services/comentarios.service';

@Component({
  selector: 'selector-listado-comentarios',
  templateUrl: 'listado-comentarios.component.html'
})

export class ListadoComentariosComponent implements OnInit {

  ColumnMode = ColumnMode;
  public comentarios: Comentario;
  public sincomentarios: boolean;
  public errorMsg: string;
  public loading: boolean;
  public rows;
  public columns;

  public pagina = new Paginacion();

  constructor(
    private _comentariosService: ComentariosService,
  ) {}

  ngOnInit() {
    this.initVariables();
  }

  private initVariables(){
    this.sincomentarios = true;
    this.loading = true;
    this.pagina = {
      total: 0,
      pages: 0,
      page: 0,
      limit: 20,
    }

    this.setPage({offset:0});

    this.columns = [
      {prop:'id', name: '#'},
      {prop:'name', name: 'Nombre'},
      {prop:'email', name: 'E-mail'},
      {prop:'body', name: 'Comentario'}
    ]
  }

  public getListadoComentarios(pagina: number){
    this._comentariosService.listadoComentarios(pagina).subscribe(
      (response: any) => {
        if(response){
          this.rows = response.data;
          this.pagina.total = response.meta.pagination.total;
          this.pagina.page = response.meta.pagination.page-1;

          this.loading = false;
        }
        else {
          this.sincomentarios = true;
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

  setPage(page){
    this.pagina.page = page.offset+1;
    this.getListadoComentarios(this.pagina.page);
  }
}
