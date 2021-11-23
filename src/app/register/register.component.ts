import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    telephone: null,
    photo: null,
    old: null,
    priority: null,
    problem: null,
    curp:null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe(
      {
        next: (res) => {
          console.log(res.Object);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        error: (e) => {
          console.error(e.error.error)
          this.errorMessage = e.error.error.message;
          this.isSignUpFailed = true;
        },
        complete: () => {
          //this.router.navigate(['/login'])
          console.info('complete')}
      }
    );
  }
}
