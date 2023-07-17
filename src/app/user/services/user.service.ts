import { Injectable } from '@angular/core';

import { User } from 'src/app/shared/models/user.model';
import { Observable, of } from 'rxjs';

const LS_CHAVE: string = "users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  listarTodos(): User[] {
    const users = localStorage[LS_CHAVE];
    return users ? JSON.parse(users) : [];
  }

  inserir(user: User): void{
    const users = this.listarTodos();
    user.id = Math.floor(Math.random() * 10000) + 1;
    users.push(user);
    localStorage[LS_CHAVE] = JSON.stringify(users);
  }

  buscarPorId(id: number): User | undefined {
    const users: User[] = this.listarTodos()
    return users.find(user => user.id === id);
  }

  buscarPorUsername(username: string): Observable<User | undefined> {
    const users: User[] = this.listarTodos();
    const usuarioEncontrado = users.find(user => user.username === username);
    return usuarioEncontrado ? of(usuarioEncontrado) : of(undefined);
  }

  atualizar(user: User): void {
    const users: User[] = this.listarTodos();
    users.forEach( (obj, index, objs) => {
      if (user.id === obj.id) {
        objs[index] = user
      }
    });

    localStorage[LS_CHAVE] = JSON.stringify(users);
  }

  remover(id: number): void {
    let users: User[] = this.listarTodos();
    users = users.filter(user => user.id !== id);
    localStorage[LS_CHAVE] = JSON.stringify(users);
  }
}
