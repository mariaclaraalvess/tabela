import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirUserComponent } from './inserir-user.component';

describe('InserirUserComponent', () => {
  let component: InserirUserComponent;
  let fixture: ComponentFixture<InserirUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InserirUserComponent]
    });
    fixture = TestBed.createComponent(InserirUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
