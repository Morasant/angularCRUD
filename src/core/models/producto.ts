export class Producto {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  status: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.image = '';
    this.price = 0;
    this.status = '';
  }
}
