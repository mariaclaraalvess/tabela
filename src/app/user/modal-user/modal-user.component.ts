import { Component, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})

export class ModalUserComponent {
  @Input() user!: User;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }
}
