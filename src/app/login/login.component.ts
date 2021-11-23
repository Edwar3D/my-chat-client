import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  loading = false

  constructor(private router: Router,private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    this.loading = true;
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      {
        next: (data) => {

            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data.dataUser);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.loading = false
            this.router.navigate(['/home']);
          },
        error: (e) => {
          this.errorMessage = e.error.error.message;
          this.isLoginFailed = true;
          this.loading = false
          console.error(e.error.error)
        },
        complete: () => {
          //this.router.navigate(['/login'])
          console.info('complete')}
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
