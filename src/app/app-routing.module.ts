import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarUserComponent } from './user/listar-user/listar-user.component';
import { InserirUserComponent } from './user/inserir-user/inserir-user.component';
import { EditarUserComponent } from './user/editar-user/editar-user.component';

const routes: Routes = [
  { path: '',
    redirectTo: 'users/listar',
    pathMatch:'full'},
  { path: 'users',
    redirectTo: 'users/listar' },
  { path: 'users/listar',
    component: ListarUserComponent },
  { path: 'users/novo',
    component: InserirUserComponent},
  { path: 'users/editar/:id',
    component: EditarUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
