import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modalnew-user',
  templateUrl: './modalnew-user.component.html',
  styleUrls: ['./modalnew-user.component.css']
})

export class ModalnewUserComponent implements OnInit {
  @ViewChild('formUser') formUser!: NgForm;
  user!: User;

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = new User();
  }

  inserir(): void {
    if (this.formUser.form.valid) {
      this.userService.inserir(this.user);
        this.router.navigate(['/users']);
        window.location.reload();
    }
  }
}