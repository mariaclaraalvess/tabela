import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { ModalnewUserComponent } from '../modalnew-user/modalnew-user.component';
import { USUARIOS } from '../mock-data';
import { orderBy } from 'lodash';


@Component({
  selector: 'app-listar-user',
  templateUrl: './listar-user.component.html',
  styleUrls: ['./listar-user.component.css'],
})
export class ListarUserComponent implements OnInit {
  users: User[] = [];
  userUsername: string = '';
  usuarioEncontrado: User | undefined;
  usuarios: User[] = USUARIOS;
  mostrarDadosMockados: boolean = true;
  public paginaAtual = 1;
  linhasPorPagina = 5;
  itensPorPagina: number = 5;
  totalUsuarios: number = 0;
  totalPaginas: number = 0;

  atualizarPaginacao(): void {
    this.paginaAtual = 1;
    this.itensPorPagina = this.linhasPorPagina;
    this.listarUsuarios();
  }
  
  
  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(): void {
    this.users = this.userService.listarTodos();
    this.totalUsuarios = this.users.length;
    this.totalPaginas = Math.ceil(this.totalUsuarios / this.itensPorPagina);
    const indiceInicio = (this.paginaAtual - 1) * this.itensPorPagina;
  
    if (this.paginaAtual === this.totalPaginas && this.totalUsuarios % this.itensPorPagina !== 0) {
      const itensRestantes = this.totalUsuarios % this.itensPorPagina;
      const indiceFim = indiceInicio + itensRestantes;
      this.users = orderBy(this.users, ['username'], ['asc']);
      this.users = this.users.slice(indiceInicio, indiceFim);
    } else {
      const indiceFim = indiceInicio + this.itensPorPagina;
      this.users = orderBy(this.users, ['username'], ['asc']);
      this.users = this.users.slice(indiceInicio, indiceFim);
    }
  
    this.mostrarDadosMockados = this.users.length === 0;
  }
  
   

  //propriedade do botão de remover
  remover($event: any, user: User): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o usuário ${user.username}?`)) {
      this.userService.remover(user.id!);
      this.listarUsuarios();
    }
  }

  //propriedade do botão visualizar
  abrirModalUser(user: User) {
    const modalRef = this.modalService.open(ModalUserComponent);
    modalRef.componentInstance.user = user;
  }

  //propriedade do botão add new user
  abrirModalnewUser(user: User) {
    const modalRef = this.modalService.open(ModalnewUserComponent);
    modalRef.result.then((result: User | undefined) => {
      if (result) {
        if (!result.id) {
          result.id = this.getNextId();
        }
        this.users.push(result);
        this.mostrarDadosMockados = false;
      }
    });
  }

  //propriedade do search
  pesquisarUsuario() {
    this.userService.buscarPorUsername(this.userUsername).subscribe(
      (usuario: User | undefined) => {
        this.usuarioEncontrado = usuario;
      }
    );
  }

  getNextId(): number {
    const maxId = Math.max(...this.users.map((user) => user.id ?? 0));
    return maxId > 0 ? maxId + 1 : 1;
  }

  paginaAnterior(): void {
    this.paginaAtual--;
    this.listarUsuarios();
  }
  
  proximaPagina(): void {
    this.paginaAtual++;
    this.listarUsuarios();
  }

  paginaPrimeira(): void {
    this.paginaAtual = 1;
    this.listarUsuarios();
  }

  paginaUltima(): void {
    this.paginaAtual = this.totalPaginas;
    this.listarUsuarios();
  }
  
}