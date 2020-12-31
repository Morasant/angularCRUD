export class Usuario {
  id?: string;
  name: string;
  email: string;
  gender: string;
  status: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.email = '';
    this.gender = '';
    this.status = '';
  }
}
