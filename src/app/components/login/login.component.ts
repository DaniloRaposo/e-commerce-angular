import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { Modal } from '../../modal';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  modalData!: Modal;
  @ViewChild(ModalComponent) modal?: ModalComponent;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get email() {
    return this.loginForm?.get('email');
  }

  get password() {
    return this.loginForm?.get('password');
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.email?.value,
        password: this.password?.value,
      }),
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error(`Error ${response.status}`);
        }

        return response.json();
      })
      .then((res: { token?: string }) => {
        if (res?.token) {
          localStorage.setItem("token", res.token);
          this.router.navigate(["/"]);
        }
      })
      .catch((err) => {
        this.modalData = {
          title: "Error",
          type: "error",
          content: err.message,
        }

        this.modal?.open();
      });
  }
}
