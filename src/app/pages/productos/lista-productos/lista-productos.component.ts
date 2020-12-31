import { Component, OnInit } from '@angular/core';
import { DataTablesRes } from 'src/core/models/data-tables-response';
import { Paginacion } from 'src/core/models/paginacion';
import { Producto } from 'src/core/models/producto';
import { ProductosService } from 'src/core/services/productos.service';

declare var $: any;

@Component({
  selector: 'app-lista-productos',
  templateUrl: 'lista-productos.component.html',
})
export class ListaProductosComponent implements OnInit {
  public dtOptions: DataTables.Settings = {};
  public productos: Producto[];
  public paginacion: Paginacion;
  public sinproductos: boolean;
  public errorMsg: string;
  public loading: boolean;

  constructor(private _productosService: ProductosService) {}

  ngOnInit() {
    this.initVariables();
  }

  private initVariables() {
    this.productos = [];
    this.sinproductos = false;
    this.loading = false;
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 20,
      serverSide: true,
      ajax: (dataTablesParameters: any, callback) => {
        this._productosService.listadoProductos(dataTablesParameters).subscribe(
          (response: any) => {
            if(response){
              this.productos = response.data;
              console.log(this.productos);
              this.loading = false;

              callback({
                draw: response.meta.pagination.page,
                recordsTotal: response.meta.pagination.total,
                recordsFiltered: response.meta.pagination.total,
                data: [],
              })
            }
            else {
              this.sinproductos = true;
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
      },
      columns: [
        {
          title: '#',
          data: 'id'
        },
        {
          title: 'Nombre',
          data: 'name'
        },
        {
          title: 'Descripción',
          data: 'description'
        },
        {
          title: 'Imagen',
          data: 'image'
        },
        {
          title: 'Precio',
          data: 'price'
        },
        {
          title: 'Status',
          data: 'status'
        },
      ]
    };
  }

  /* public getListadoproductos() {
    this._productosService.listadoProductos().subscribe(
      (response: any) => {
        if (response) {
          this.sinproductos = false;
          this.productos = response.data;
          this.paginacion = response.meta.pagination;
          console.log(this.productos);
          console.log(this.paginacion);

          this.dtOptions = {
            data: this.productos,
            pagingType: 'simple_numbers',
            serverSide: true,
            paging: true,
            columns: [
              { title: '#', data: 'id' },
              { title: 'Nombre', data: 'name' },
              { title: 'Descripción', data: 'description' },
              { title: 'Imagen', data: 'image' },
              { title: 'Precio', data: 'price' },
              { title: 'Status', data: 'status' },
            ],
          };
          console.log(this.dtOptions);
          this.loading = false;
        }
        else{
          this.sinproductos = true;
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

  /* public getListadoproductos(){
    this._productosService.listadoProductos().subscribe(
      (response: any) => {
        if(response){
          this.productos = response.data;
          console.log(this.productos);

          this.loading = false;
        }
        else {
          this.sinproductos = true;
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

  /* public getproducto(idproducto: any){
    this.seleccionado = idproducto;
    this._productosService.detalleproducto(idproducto).subscribe(
      (response: any) => {
        if (response) {
          this.producto = response.data;
          console.log(this.producto);

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
}
