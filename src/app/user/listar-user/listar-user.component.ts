import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { ModalnewUserComponent } from '../modalnew-user/modalnew-user.component';
import { USUARIOS } from '../mock-data';


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

  atualizarPaginacao() {
    this.paginaAtual = 1;
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
    const indiceInicio = (this.paginaAtual - 1) * this.linhasPorPagina;
    const indiceFim = indiceInicio + this.linhasPorPagina;
    this.users = this.users.slice(indiceInicio, indiceFim);
    this.mostrarDadosMockados = this.users.length === 0;
  }

  remover($event: any, user: User): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o usuário ${user.username}?`)) {
      this.userService.remover(user.id!);
      this.listarUsuarios();
    }
  }

  abrirModalUser(user: User) {
    const modalRef = this.modalService.open(ModalUserComponent);
    modalRef.componentInstance.user = user;
  }

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
}