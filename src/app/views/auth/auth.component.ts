import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NbIconConfig, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  exForm: FormGroup;
  loginForm: FormGroup;
  authState = 'login';
  showPassword = false;
  applyFormAnim = false;

  constructor(private user: UserService, private router: Router, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.exForm = new FormGroup({
      userName: new FormControl(''),
      email: new FormControl(''),
      passwordHash: new FormControl('')
    });

    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit(value: any): void {
    this.user.register(value)
      .subscribe(data => console.log(data),
        () => this.showToast('close-circle-outline'),
        () => {

        }
      );
  }

  onLoginSubmit(value: any): void {
    this.user.login(value)
      .subscribe(
        data => this.user.storeToken(data.token),
        () => this.showToast('close-circle-outline'),
        () => this.router.navigate(['/home'])
      );
  }

  changeAuthView(): void {
    this.authState === 'login' ? this.authState = 'register' : this.authState = 'login';
  }


  getInputType(): string {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }


  showToast(iconName): void {
    let message = '';
    const iconConfig: NbIconConfig = { icon: iconName, pack: 'eva' };
    if (this.authState === 'login') {
      message = 'Invalid email or password';
    }
    else if (this.authState === 'register') {
      message = 'Could not create your account';
    }
    this.toastrService.danger(message, 'Oops..', iconConfig);
  }
}
