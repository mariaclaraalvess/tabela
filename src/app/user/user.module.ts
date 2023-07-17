import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { ListarUserComponent } from './listar-user/listar-user.component';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InserirUserComponent } from './inserir-user/inserir-user.component';
import { EditarUserComponent } from './editar-user/editar-user.component';
import { ModalUserComponent } from './modal-user/modal-user.component';
import { ModalnewUserComponent } from './modalnew-user/modalnew-user.component';





@NgModule({
  declarations: [
    ListarUserComponent,
    InserirUserComponent,
    EditarUserComponent,
    ModalUserComponent,
    ModalnewUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
