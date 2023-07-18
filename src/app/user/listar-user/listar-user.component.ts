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
  users: User[] = []; // Array que armazena os usuários
  userUsername: string = ''; // Armazena o valor de entrada do campo de pesquisa
  usuarioEncontrado: User | undefined; // Armazena o usuário encontrado pela pesquisa
  usuarios: User[] = USUARIOS; // Array que armazena usuários mockados
  mostrarDadosMockados: boolean = true; // Define se os dados mockados devem ser mostrados
  public paginaAtual = 1; // Número da página atual
  itensPorPagina: number = 5; // Número de itens (usuários) por página
  totalUsuarios: number = 0; // Número total de usuários
  totalPaginas: number = 0; // Número total de páginas

  atualizarPaginacao(): void {
    this.paginaAtual = 1; // Define a página atual como a primeira
    this.listarUsuarios(); // Atualiza a listagem de usuários com base nas novas configurações de paginação
  }

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.listarUsuarios(); // Carrega a listagem de usuários ao inicializar o componente
  }

  listarUsuarios(): void {
    this.users = this.userService.listarTodos(); // Obtém a lista de usuários do serviço UserService
    this.mostrarDadosMockados = this.users.length === 0 && this.usuarios.length > 0; // Define se os dados mockados devem ser mostrados com base na quantidade de usuários exibidos
    this.totalUsuarios = this.users.length; // Atualiza o número total de usuários
    this.totalPaginas = Math.ceil(this.totalUsuarios / this.itensPorPagina); // Calcula o número total de páginas com base no número de usuários e itens por página

    const indiceInicio = (this.paginaAtual - 1) * this.itensPorPagina; // Calcula o índice de início dos usuários a serem exibidos na página atual

    if (
      this.paginaAtual === this.totalPaginas &&
      this.totalUsuarios % this.itensPorPagina !== 0
    ) {
      // Se for a última página e houver itens restantes que não preencham uma página completa
      const itensRestantes = this.totalUsuarios % this.itensPorPagina;
      const indiceFim = indiceInicio + itensRestantes;
      this.users = orderBy(this.users, ['username'], ['asc']); // Ordena os usuários por nome de usuário
      this.users = this.users.slice(indiceInicio, indiceFim); // Filtra a lista de usuários para exibir apenas os da página atual
    } else {
      const indiceFim = indiceInicio + this.itensPorPagina;
      this.users = orderBy(this.users, ['username'], ['asc']); 
      this.users = this.users.slice(indiceInicio, indiceFim); 
    }
  }

  remover($event: any, user: User): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o usuário ${user.username}?`)) {
      this.userService.remover(user.id!); // Remove o usuário utilizando o serviço UserService
      this.listarUsuarios(); // Atualiza a listagem de usuários após a remoção
    }
  }

  abrirModalUser(user: User) {
    const modalRef = this.modalService.open(ModalUserComponent); // Abre um modal para exibir os detalhes do usuário
    modalRef.componentInstance.user = user; // Passa o usuário para o componente do modal
  }

  abrirModalnewUser(user: User) {
    const modalRef = this.modalService.open(ModalnewUserComponent); // Abre um modal para adicionar um novo usuário
    modalRef.result.then((result: User | undefined) => {
      if (result) {
        if (!result.id) {
          result.id = this.getNextId(); // Obtém o próximo ID disponível para o novo usuário
        }
        this.users.push(result); // Adiciona o novo usuário à lista de usuários
        this.mostrarDadosMockados = false; // Define que os dados mockados não devem mais ser mostrados
      }
    });
  }

  pesquisarUsuario() {
    this.userService.buscarPorUsername(this.userUsername).subscribe(
      (usuario: User | undefined) => {
        this.usuarioEncontrado = usuario; // Realiza a pesquisa por nome de usuário e armazena o resultado
      }
    );
  }

  getNextId(): number {
    const maxId = Math.max(...this.users.map((user) => user.id ?? 0)); // Obtém o maior ID atualmente atribuído
    return maxId > 0 ? maxId + 1 : 1; // Retorna o próximo ID disponível
  }

  paginaAnterior(): void {
    this.paginaAtual--; // Navega para a página anterior
    this.listarUsuarios(); // Atualiza a listagem de usuários com base na nova página
  }

  proximaPagina(): void {
    this.paginaAtual++; // Navega para a próxima página
    this.listarUsuarios(); // Atualiza a listagem de usuários com base na nova página
  }

  paginaPrimeira(): void {
    this.paginaAtual = 1; // Navega para a primeira página
    this.listarUsuarios(); // Atualiza a listagem de usuários com base na nova página
  }

  paginaUltima(): void {
    this.paginaAtual = this.totalPaginas; // Navega para a última página
    this.listarUsuarios(); // Atualiza a listagem de usuários com base na nova página
  }
}
