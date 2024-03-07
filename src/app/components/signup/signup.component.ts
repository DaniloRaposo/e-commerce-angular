import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl("", [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordAgain: new FormControl('', [
        Validators.required,
        this.equalPasswordValidator(),
      ]),
    });
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get passwordAgain() {
    return this.signupForm.get('passwordAgain');
  }

  get name() {
    return this.signupForm.get("name");
  }

  private equalPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      return value === this.password?.value ? null : { passwordNotEqual: true };
    };
  }

  submit() {
    if (this.signupForm.invalid) {
      return;
    }

    fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.email?.value,
        name: this.name?.value,
        password: this.password?.value,
      }),
    })
      .then(response => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error(`Error ${response.status}`);
        }

        return response.json();
      }).then((responseContent) => {
        console.log(responseContent)
        this.router.navigate(["/"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
