import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.css']
})
export class EditarUserComponent implements OnInit{
  @ViewChild("formUser") formUser!: NgForm;
  user!: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ){ }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    const res = this.userService.buscarPorId(id);
    if (res !== undefined)
      this.user = res;
    else
      throw new Error ("Usuário não encontrado: id = " + id);
  }

  atualizar(): void{
    if (this.formUser.form.valid) {
        this.userService.atualizar(this.user);
        this.router.navigate(['/users']);
    }
  }
  
}