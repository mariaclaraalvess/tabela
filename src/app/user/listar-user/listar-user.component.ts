import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { User } from 'src/app/shared/models/user.model';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { ModalnewUserComponent } from '../modalnew-user/modalnew-user.component';

@Component({
  selector: 'app-listar-user',
  templateUrl: './listar-user.component.html',
  styleUrls: ['./listar-user.component.css'],
})

export class ListarUserComponent implements OnInit {

  users: User[] = [];
  userUsername: string = '';
  usuarioEncontrado: User | undefined;

  constructor(private userService : UserService,
              private modalService: NgbModal,
              ) { }

  ngOnInit(): void {
    this.users = this.listarTodos();
  }

  listarTodos(): User[] {
    return this.userService.listarTodos();
  }

  remover ($event: any, user: User): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o usuário ${user.username}?`)) {
        this.userService.remover(user.id!);
        this.users = this.listarTodos();
    }
  }

  abrirModalUser(user: User) {
    const modalRef = this.modalService.open(ModalUserComponent);
    modalRef.componentInstance.user = user;
  }

  abrirModalnewUser(user: User) {
    const modalRef = this.modalService.open(ModalnewUserComponent);
  }

  pesquisarUsuario() {
    this.userService.buscarPorUsername(this.userUsername)
      .subscribe((usuario: User | undefined) => {
        this.usuarioEncontrado = usuario;
      });
    }
}
