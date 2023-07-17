import { Component, OnInit, ViewChild} from '@angular/core';

import { UserService } from '../services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inserir-user',
  templateUrl: './inserir-user.component.html',
  styleUrls: ['./inserir-user.component.css']
})
export class InserirUserComponent implements OnInit {
  @ViewChild('formUser') formUser! : NgForm;
  user! : User;

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = new User();
  }

  inserir(): void {
    if (this.formUser.form.valid){
      this.userService.inserir(this.user);
      this.router.navigate( ["/users"] );
    }
  }
}
